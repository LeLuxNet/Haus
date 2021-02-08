require("../const");

import { Home, homes } from "./home";
import { createApi } from "./api";
import { Light } from "../lighting/light";
import { daylightColor } from "../lighting/daylight";
import { CryptoCurrency } from "../counter/crypto";
import { loadPlugins } from "./plugin";
import { Logger } from "../logger";

export async function startServer(port: string) {
  Logger._.info("Starting server");

  const app = createApi();
  await loadPlugins();

  // tmp
  const home = new Home("123", "My Home");
  homes.set(home.id, home);

  app.listen(port, () => {
    Logger._.info(`Listening on port ${port}`);
  });
}
