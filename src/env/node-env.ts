import process from "node:process";

import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["DEV", "STAGING", "PROD"]).optional().default("DEV"),
  PORT: z.coerce.number().int().positive().optional().default(3000),
});

export type AppEnvVariables = z.infer<typeof envSchema>;

export const envVariables = envSchema.parse(process.env);
