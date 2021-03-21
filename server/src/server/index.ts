require("../const");

import { createApi } from "../api";
import { Logger } from "../logger";
import { loadPlugin } from "../plugins";
import { Home, homes } from "./home";
import { Room } from "./room";

export async function startServer(port: string) {
  Logger._.info("Starting server");

  createApi();

  // tmp
  const home = new Home("123", "My Home");
  homes.set(home.id, home);

  const room = new Room("Living room", home, [1]);
  const id = home.rooms.push(room);
  room.id = id - 1;

  loadPlugin(
    {
      type: "debug",
    },
    home
  );
}
