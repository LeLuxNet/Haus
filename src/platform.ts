import { Device } from "./device";
import { Logger } from "./logger";
import { PluginInstance } from "./plugins";
import { Home } from "./server/home";

export class Platform implements PluginInstance {
  id: number;
  home: Home;
  logger: Logger;
  devices: () => Promise<Device[]>;

  stop?(): Promise<void>;

  constructor(
    id: number,
    home: Home,
    logger: Logger,
    devices: (p: Platform) => Promise<Device[]>
  ) {
    this.id = id;
    this.home = home;
    this.logger = logger;
    this.devices = () => devices(this);
  }
}
