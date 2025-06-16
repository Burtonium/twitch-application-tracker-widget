import type { JobApplication } from "@prisma/client";
import { z, type ZodType } from "zod";

export const createJobApplicationSchema = z.object({
  status: z
    .enum(["Pending", "Interviewing", "Success", "Rejected"])
    .default("Pending")
    .optional(),
  company: z.string().min(1),
  title: z.string().min(1),
  url: z
    .string()
    .regex(
      /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
      "Must be a url",
    ),
  createdAt: z.date().optional(),
}) satisfies ZodType<Partial<JobApplication>>;

export const applicationStats = z
  .array(
    z.object({
      derived_status: z.string(),
      count: z.bigint().transform((count) => Number(count)),
    }),
  )
  .transform((stats) => ({
    total: stats.reduce((acc, stat) => acc + stat.count, 0),
    stats: stats.map((stat) => ({
      count: stat.count,
      status: stat.derived_status,
    })),
  }));
