import { Device } from "../device";
import { Platform } from "../platform";
import { State } from "../state";
import { Color } from "./color";

export class Light extends Device {
  on: State<boolean>;
  color: State<Color>;

  constructor(platform: Platform, on: State<boolean>, color: State<Color>) {
    super(platform);
    this.on = on;
    this.color = color;
  }
}
