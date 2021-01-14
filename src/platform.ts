import { Device } from "./device";

export abstract class Platform {
  abstract devices(): Promise<Device>;

  async stop() {}
}
