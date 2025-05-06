import type { JobApplication } from "@prisma/client";
import { z, ZodType } from "zod";

export const createJobApplicationSchema = z.object({
  status: z
    .enum(["Pending", "Interviewing", "Success", "Rejected"])
    .optional()
    .default("Pending"),
  company: z.string().min(1),
  title: z.string().min(1),
  url: z.string().url(),
}) satisfies ZodType<Partial<JobApplication>>;
