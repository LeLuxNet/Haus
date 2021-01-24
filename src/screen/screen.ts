import { Device } from "../device";
import { Color } from "../lighting/color";
import { Platform } from "../platform";
import { State } from "../state";

export class Screen extends Device {
  width: number;
  height: number;

  pixels: State<Color>[][];
  update: () => void;

  constructor(
    platform: Platform,
    width: number,
    height: number,
    update: () => void,
    fill: (x: number, y: number) => Color = (_, __) => new Color(0, 0, 0)
  ) {
    super(platform);
    this.width = width;
    this.height = height;

    this.pixels = new Array(width).fill(null).map((_, x) =>
      new Array(height).fill(null).map(
        (_, y) => new State<Color>(fill(x, y), undefined, async () => update())
      )
    );

    this.update = update;
  }

  fill(fn: (x: number, y: number) => Color) {
    this.pixels.forEach((row, x) => row.forEach((s, y) => (s.last = fn(x, y))));
    this.update();
  }
}
