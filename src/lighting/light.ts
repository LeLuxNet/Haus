import { State } from "../state";

export class Light {
  on: State<boolean>;

  bri?: State<number>;
  sat?: State<number>;
  hue?: State<number>;

  constructor(on: State<boolean>) {
    this.on = on;
  }
}
