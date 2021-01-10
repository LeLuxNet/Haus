export class Color {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  static fromRGB(r: number, g: number, b: number) {
    const adjust = (u: number) => {
      if (u <= 0.04045) {
        return u / 12.92;
      } else {
        return Math.pow((u + 0.055) / 1.055, 2.4);
      }
    };

    r = adjust(r / 255);
    g = adjust(g / 255);
    b = adjust(b / 255);

    const x = 0.4123908 * r + 0.35758434 * g + 0.18048079 * b;
    const y = 0.21263901 * r + 0.71516868 * g + 0.07219232 * b;
    const z = 0.01933082 * r + 0.11919478 * g + 0.95053215 * b;

    return new Color(x, y, z);
  }

  toRGB(): [number, number, number] {
    const r = 3.24096994 * this.x - 1.53738318 * this.y - 0.49861076 * this.z;
    const g = -0.96924364 * this.x + 1.8759675 * this.y + 0.04155506 * this.z;
    const b = 0.05563008 * this.x - 0.20397696 * this.y + 1.05697151 * this.z;

    const gamma = (u: number) => {
      if (u <= 0.0031308) {
        return 12.92 * u;
      }
      return 1.055 * Math.pow(u, 1 / 2.4) - 0.055;
    };

    const adjust = (u: number) =>
      Math.round(Math.min(Math.max(gamma(u), 0), 1) * 255);

    return [adjust(r), adjust(g), adjust(b)];
  }

  toHSV(): [number, number, number] {
    var [r, g, b] = this.toRGB();

    r /= 255;
    g /= 255;
    b /= 255;

    const Cmax = Math.max(r, g, b);
    const Cmin = Math.min(r, g, b);

    const delta = Cmax - Cmin;

    const h = ((): number => {
      if (delta === 0) {
        return 0;
      } else if (Cmax === r) {
        return 60 * ((g - b) / delta);
      } else if (Cmax === g) {
        return 60 * ((b - r) / delta + 2);
      } else {
        return 60 * ((r - g) / delta + 4);
      }
    })();

    const s = Cmax === 0 ? 0 : (delta / Cmax) * 255;

    return [h < 0 ? h + 360 : h, s, Cmax * 255];
  }
}
