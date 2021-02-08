import { Device } from "./device";
import { Logger } from "./logger";
import { Home } from "./server/home";

export abstract class Platform {
  id: string;
  home: Home;
  logger: Logger;

  constructor(id: string, home: Home, logger: Logger) {
    this.id = id;
    this.home = home;
    this.logger = logger;
  }

  abstract devices(): Promise<Device[]>;

  async stop() {}
}
