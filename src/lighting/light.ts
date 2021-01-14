import { Device } from "../device";
import { State } from "../state";
import { Color } from "./color";

export class Light extends Device {
  on: State<boolean>;
  color: State<Color>;

  constructor(on: State<boolean>, color: State<Color>) {
    super();
    this.on = on;
    this.color = color;
  }
}
