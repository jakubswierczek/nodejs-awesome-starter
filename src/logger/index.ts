import * as process from "node:process";

import * as Pino from "pino";

export type LogLevel =
  | "silent"
  | "trace"
  | "debug"
  | "info"
  | "warn"
  | "error"
  | "fatal";
export interface Logger {
  silent(
    object: Record<string, unknown>,
    message: string,
    ...args: unknown[]
  ): void;
  silent(message: string, ...args: unknown[]): void;
  trace(
    object: Record<string, unknown>,
    message: string,
    ...args: unknown[]
  ): void;
  trace(message: string, ...args: unknown[]): void;
  debug(
    object: Record<string, unknown>,
    message: string,
    ...args: unknown[]
  ): void;
  debug(message: string, ...args: unknown[]): void;
  info(
    object: Record<string, unknown>,
    message: string,
    ...args: unknown[]
  ): void;
  info(message: string, ...args: unknown[]): void;
  warn(
    object: Record<string, unknown>,
    message: string,
    ...args: unknown[]
  ): void;
  warn(message: string, ...args: unknown[]): void;
  error(
    object: Record<string, unknown>,
    message: string,
    ...args: unknown[]
  ): void;
  error(message: string, ...args: unknown[]): void;
  fatal(
    object: Record<string, unknown>,
    message: string,
    ...args: unknown[]
  ): void;
  fatal(message: string, ...args: unknown[]): void;
  child(
    bindings: { service: string } & Record<string, unknown>,
    options?: { level?: LogLevel; msgPrefix?: string },
  ): Logger;
}
export const logger: Logger = Pino.pino({
  level: process.env.PINO_LOG_LEVEL || "info",
  formatters: {
    bindings: (bindings) => {
      return {
        ...bindings,
        nodeVersion: process.version,
      };
    },
    level: (label) => {
      return { level: label.toUpperCase() };
    },
  },
  timestamp: Pino.pino.stdTimeFunctions.isoTime,
});

export default logger;
