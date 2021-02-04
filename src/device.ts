import { Platform } from "./platform";

export class Device {
  id: number;
  name?: string;
  platform: Platform;

  constructor(id: number, platform: Platform) {
    this.id = id;
    this.platform = platform;
  }
}
