import { Device } from "../device";
import { Platform } from "../platform";
import { State } from "../state";
import { Color } from "./color";
import { ColorState } from "./state";

export class Light extends Device {
  on: State<boolean>;
  color: ColorState;

  constructor(
    id: number,
    platform: Platform,
    on: State<boolean>,
    color: ColorState
  ) {
    super(id, platform);
    this.on = on;
    this.color = color;
  }
}
