import { Device } from "./device";

export abstract class Platform {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  abstract devices(): Promise<Device[]>;

  async stop() {}
}
