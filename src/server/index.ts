import {} from "../const";

import { Home, homes } from "./home";
import { createApi } from "./api";
import { Light } from "../lighting/light";
import { daylightColor } from "../lighting/daylight";
import { CryptoCurrency } from "../counter/crypto";
import { loadPlugins } from "./plugin";

export async function startServer(port: string | number) {
  console.log("Starting server");

  const app = createApi();
  await loadPlugins();

  // tmp
  const home = new Home("123", "My Home");
  homes.set(home.id, home);

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}
