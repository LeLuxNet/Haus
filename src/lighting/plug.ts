import { Device } from "../device";
import { Platform } from "../platform";
import { State } from "../state";

export class Plug extends Device {
  on: State<boolean>;

  constructor(id: number, platform: Platform, on: State<boolean>) {
    super(id, platform);
    this.on = on;
  }

  get type() {
    return "plug";
  }

  get data() {
    return {
      on: this.on.last,
    };
  }
}
