require("../const");

import { createApi } from "../api";
import { Logger } from "../logger";
import { Home, homes } from "./home";

export async function startServer(port: string) {
  Logger._.info("Starting server");

  createApi();

  // tmp
  const home = new Home("123", "My Home");
  homes.set(home.id, home);
}
