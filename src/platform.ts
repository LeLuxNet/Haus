import { Device } from "./device";
import { Home } from "./server/home";

export abstract class Platform {
  id: string;
  home: Home;

  constructor(id: string, home: Home) {
    this.id = id;
    this.home = home;
  }

  abstract devices(): Promise<Device[]>;

  async stop() {}
}
