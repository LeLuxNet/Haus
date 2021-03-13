require("../const");

import { Logger } from "../logger";
import { createApi } from "./api";
import { Home, homes } from "./home";

export async function startServer(port: string) {
  Logger._.info("Starting server");

  const app = createApi();

  // tmp
  const home = new Home("123", "My Home");
  homes.set(home.id, home);

  app.listen(port, () => {
    Logger._.info(`Listening on port ${port}`);
  });
}
