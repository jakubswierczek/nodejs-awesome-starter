import { serve } from "@hono/node-server";

import { envVariables } from "./env/node-env.js";
import logger from "./logger/index.js";
import factory from "./node-app-factory.js";

const app = factory.createApp();

app.get("/", (c) => {
  return c.json({ message: "Hello World!" });
});

logger.info(`Server is running on port ${envVariables.PORT}`);

serve({
  fetch: app.fetch,
  port: envVariables.PORT,
});

export default app;
