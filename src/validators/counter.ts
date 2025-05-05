import { z } from "zod";

export const createCounterSchema = z.object({
  name: z
    .string()
    .min(1)
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Only letters, numbers and underscores are allowed",
    )
    .transform((value) => value.toLowerCase()),
});
