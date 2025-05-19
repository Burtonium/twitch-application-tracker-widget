import type { JobApplication } from "@prisma/client";
import { z, ZodType } from "zod";

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
