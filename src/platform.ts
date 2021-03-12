import { Logger } from "./logger";
import { PluginInstance } from "./plugins";
import { Home } from "./server/home";

export abstract class Platform implements PluginInstance {
  id: string;
  home: Home;
  logger: Logger;

  constructor(id: string, home: Home, logger: Logger) {
    this.id = id;
    this.home = home;
    this.logger = logger;
  }

  // tmp
  fields = {};
}
