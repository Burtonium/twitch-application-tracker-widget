import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { createJobApplicationSchema } from "@/validators/jobApplication";

export const jobApplicationsRouter = createTRPCRouter({
  create: publicProcedure
    .input(createJobApplicationSchema)
    .mutation(({ ctx, input }) =>
      ctx.db.jobApplication.create({
        data: input,
      }),
    ),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) =>
      ctx.db.jobApplication.delete({
        where: { id: input.id },
      }),
    ),
  list: publicProcedure.query(async ({ ctx }) =>
    ctx.db.jobApplication.findMany({
      orderBy: { createdAt: "asc" },
    }),
  ),
});
