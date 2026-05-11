import { z } from "zod";

export const registrySearchSchema = z.object({
  q: z.string().trim().max(120).optional().default(""),
  category: z.string().trim().max(80).optional(),
  tag: z.string().trim().max(80).optional(),
});

export const installRequestSchema = z.object({
  slug: z.string().trim().min(1).max(120).regex(/^[a-z0-9-]+$/),
});

export const authEmailSchema = z.object({
  email: z.string().email(),
});

export const signInSchema = authEmailSchema.extend({
  password: z.string().min(12),
});

export const signUpSchema = signInSchema.extend({
  name: z.string().trim().min(2).max(120),
});
