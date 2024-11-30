import process from "node:process";

import { z } from "zod";

import { LogLevel } from "../logger/log-level.js";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["DEV", "TEST", "STAGING", "PROD"])
    .optional()
    .default("DEV"),
  PORT: z.coerce.number().int().positive().optional().default(3000),
  LOGGER_LEVEL: z.nativeEnum(LogLevel).optional().default(LogLevel.info),
});

export type AppEnvVariables = z.infer<typeof envSchema>;

export const envVariables = envSchema.parse(process.env);
