import { State } from "../state";
import { Color } from "./color";

export class Light {
  on: State<boolean>;

  bri?: State<number>; // 0 - 255
  sat?: State<number>; // 0 - 255
  hue?: State<number>; // 0 - 360

  ct?: State<number>;

  constructor(on: State<boolean>) {
    this.on = on;
  }

  set(col: Color) {
    const hasBri = this.bri !== undefined && this.bri.set !== undefined;
    const hasSat = this.sat !== undefined && this.sat.set !== undefined;
    const hasHue = this.hue !== undefined && this.hue.set !== undefined;

    if (hasBri && hasSat && hasHue) {
      const [h, s, v] = col.toHSV();
      this.hue!.set!(h);
      this.sat!.set!(s);
      this.bri!.set!(v);
    }
  }
}
