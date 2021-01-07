import { State } from "../state";

export class Light {
  on: State<boolean>;

  bri?: State<number>; // 0 - 255
  sat?: State<number>; // 0 - 255
  hue?: State<number>; // 0 - 360

  ct?: State<number>;

  constructor(on: State<boolean>) {
    this.on = on;
  }
}
