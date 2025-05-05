import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { createCounterSchema } from "@/validators/counter";

export const counterRouter = createTRPCRouter({
  create: publicProcedure
    .input(createCounterSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.counter.create({
        data: {
          name: input.name,
        },
      });
    }),
  increment: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.counter.update({
        where: { id: input.id },
        data: { value: { increment: 1 } },
      });
    }),
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.counter.findMany();
  }),
});
