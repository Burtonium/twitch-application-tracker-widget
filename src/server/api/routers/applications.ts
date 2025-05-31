import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { createJobApplicationSchema } from "@/validators/jobApplication";
import { JobApplicationStatus, PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import dayjs from "@/dayjs";
import { DAY_THRESHOLD } from "@/consts";
import IterableEventEmitter, { on } from "@/utils/event-emitter";

const eventEmitter = new IterableEventEmitter();

const applicationStats = z
  .array(
    z.object({
      derived_status: z.string(),
      count: z.bigint().transform((count) => Number(count)),
    }),
  )
  .transform((stats) =>
    stats.map((stat) => ({
      count: stat.count,
      status: stat.derived_status,
    })),
  );

const fetchStats = async (db: PrismaClient) => {
  const thresholdDate = dayjs().subtract(DAY_THRESHOLD, "days").toISOString();

  const applicationStatuses = await db.$queryRawUnsafe(
    `
        SELECT
          CASE
            WHEN ja.status = 'Pending'
              AND "createdAt" <= '${thresholdDate}'::timestamptz
            THEN 'No answer'
            ELSE ja.status::text   
          END AS derived_status,
          COUNT(*) AS count
        FROM "JobApplication" AS ja
        GROUP BY derived_status
        ORDER BY count DESC;
      `,
  );

  return applicationStats.parse(applicationStatuses);
};

export const jobApplicationsRouter = createTRPCRouter({
  create: publicProcedure
    .input(createJobApplicationSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.jobApplication.create({
        data: input,
      });

      const stats = await fetchStats(ctx.db);
      eventEmitter.emit("StatsUpdated", stats);
    }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.jobApplication.delete({
        where: { id: input.id },
      });

      const stats = await fetchStats(ctx.db);
      eventEmitter.emit("StatsUpdated", stats);
    }),
  list: publicProcedure
    .input(z.object({ search: z.string().optional() }).optional())
    .query(async ({ ctx, input }) => {
      const jobApplications = await ctx.db.jobApplication.findMany({
        where: input?.search
          ? {
              OR: [
                { title: { contains: input.search, mode: "insensitive" } },
                {
                  company: {
                    contains: input.search,
                    mode: "insensitive",
                  },
                },
                {
                  url: {
                    contains: input.search,
                    mode: "insensitive",
                  },
                },
              ],
            }
          : undefined,
        orderBy: { createdAt: "asc" },
      });

      return jobApplications;
    }),
  updateStatus: publicProcedure
    .input(
      z.object({ id: z.string(), status: z.nativeEnum(JobApplicationStatus) }),
    )
    .mutation(async ({ ctx, input }) => {
      const jobApplication = await ctx.db.jobApplication.findUnique({
        where: { id: input.id },
      });

      if (!jobApplication) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Job application not found",
        });
      }

      await ctx.db.jobApplication.update({
        where: { id: input.id },
        data: { status: input.status },
      });

      const stats = await fetchStats(ctx.db);
      eventEmitter.emit("StatsUpdated", stats);
    }),
  getStats: publicProcedure.subscription(async function* ({
    ctx: { db },
    signal,
  }) {
    yield await fetchStats(db);

    for await (const [newStats] of eventEmitter.toIterable("StatsUpdated", {
      signal,
    })) {
      yield newStats;
    }
  }),
  count: publicProcedure.query(async ({ ctx }) =>
    ctx.db.jobApplication.count(),
  ),
});
