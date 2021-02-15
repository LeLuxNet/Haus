require("../const");

import { createApi } from "./api";
import { loadPlugins } from "./plugin";
import { Logger } from "../logger";

export async function startServer(port: string) {
  Logger._.info("Starting server");

  const app = createApi();

  await loadPlugins();

  app.listen(port, () => {
    Logger._.info(`Listening on port ${port}`);
  });
}
