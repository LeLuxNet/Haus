import { Device } from "../device";
import { Color } from "../lighting/color";
import { ColorState } from "../lighting/state";
import { Platform } from "../platform";

export class Screen extends Device {
  width: number;
  height: number;

  pixels: ColorState[][];
  update: () => void;

  constructor(
    id: number,
    platform: Platform,
    width: number,
    height: number,
    update: () => void,
    fill: (x: number, y: number) => Color = (_, __) => new Color(0, 0, 0)
  ) {
    super(id, platform);
    this.width = width;
    this.height = height;

    this.pixels = new Array(width)
      .fill(null)
      .map((_, x) =>
        new Array(height)
          .fill(null)
          .map(
            (_, y) =>
              new ColorState({ initial: fill(x, y), set: async () => update() })
          )
      );

    this.update = update;
  }

  fill(fn: (x: number, y: number) => Color) {
    this.pixels.forEach((row, x) => row.forEach((s, y) => (s.last = fn(x, y))));
    this.update();
  }

  get type() {
    return "screen";
  }

  get values() {
    return {};
  }
}
