import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { createCounterSchema } from "@/validators/counter";
import EventEmitter, { on } from "@/utils/event-emitter";
import { tracked } from "@trpc/server";

const ee = new EventEmitter();

export const counterRouter = createTRPCRouter({
  create: publicProcedure
    .input(createCounterSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.counter.create({
        data: {
          name: input.name,
          uri: input.uri,
        },
      });
    }),
  reset: publicProcedure
    .input(z.object({ uri: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const updated = await ctx.db.counter.update({
        where: { uri: input.uri },
        data: { value: 0 },
      });

      ee.emit("CounterUpdated", updated.uri, updated);
    }),
  delete: publicProcedure
    .input(z.object({ uri: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.counter.delete({
        where: { uri: input.uri },
      });
    }),
  increment: publicProcedure
    .input(z.object({ uri: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const updated = await ctx.db.counter.update({
        where: { uri: input.uri },
        data: { value: { increment: 1 } },
      });

      ee.emit("CounterUpdated", input.uri, updated);

      return updated;
    }),
  decrement: publicProcedure
    .input(z.object({ uri: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const updated = await ctx.db.counter.update({
        where: { uri: input.uri },
        data: { value: { decrement: 1 } },
      });

      ee.emit("CounterUpdated", input.uri, updated);

      return updated;
    }),
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.counter.findMany({
      orderBy: { name: "asc" },
    });
  }),
  getByName: publicProcedure
    .input(z.object({ uri: z.string() }))
    .subscription(async function* (opts) {
      const { uri } = opts.input;

      const initialCounter = await opts.ctx.db.counter.findUnique({
        where: { uri },
      });

      if (initialCounter) {
        yield tracked(initialCounter.uri, initialCounter);
      }

      for await (const [counterUri, counter] of ee.toIterable(
        "CounterUpdated",
        {
          signal: opts.signal,
        },
      )) {
        if (counterUri === uri) {
          yield tracked(counterUri, counter);
        }
      }
    }),
});
