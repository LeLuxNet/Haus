import { Platform } from "./platform";

export class Device {
  platform: Platform;

  constructor(platform: Platform) {
    this.platform = platform;
  }
}
