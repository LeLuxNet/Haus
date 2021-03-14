import { Device } from "../device";
import { Platform } from "../platform";
import { State } from "../state";

export class Outlet extends Device {
  on: State<boolean>;

  constructor(id: number, platform: Platform, on: State<boolean>) {
    super(id, platform);
    this.on = on;
  }

  get type() {
    return "outlet";
  }

  get values() {
    return {
      on: this.on,
    };
  }
}
