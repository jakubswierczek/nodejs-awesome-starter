import type { Hono } from 'hono';
import { createFactory } from 'hono/factory';
import { logger as honoLogger } from 'hono/logger';
import { requestId } from 'hono/request-id';
import { getPath } from 'hono/utils/url';

import { type AppEnvVariables, envVariables } from './env/node-env.js';
import logger, { type Logger } from './logger/index.js';

export type Bindings = Record<string, unknown> & AppEnvVariables;

export type Variables = {
  requestId: string;
  logger: Logger;
};

export type App = Hono<{ Bindings: Bindings; Variables: Variables }>;

export default createFactory<{ Bindings: Bindings; Variables: Variables }>({
  initApp: (app) => {
    app.use(async (c, next) => {
      Object.assign(c.env, envVariables);
      await next();
    });
    app.use(requestId());
    app.use(honoLogger((str, ...args: string[]) => logger.info(str, args)));
    app.use(async (c, next) => {
      const requestId = c.get('requestId');
      const path = getPath(c.req.raw);
      const requestScopeLogger = logger.child({
        service: 'api',
        requestId,
        path,
      });
      c.set('logger', requestScopeLogger);
      await next();
    });
  },
});
