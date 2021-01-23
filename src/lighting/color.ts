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

  static fromHSV(h: number, s: number, v: number) {
    s /= 255;
    v /= 255;

    const c = v * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = v - c;

    var r = 0;
    var g = 0;
    var b = 0;

    if (h < 60) {
      r = c;
      g = x;
    } else if (h < 120) {
      r = x;
      g = c;
    } else if (h < 180) {
      g = c;
      b = x;
    } else if (h < 240) {
      g = x;
      b = c;
    } else if (h < 300) {
      r = x;
      b = c;
    } else {
      r = c;
      b = x;
    }

    return Color.fromRGB((r + m) * 255, (g + m) * 255, (b + m) * 255);
  }

  static fromCIELAB(L: number, a: number, b: number) {
    const delta = 6 / 29;
    const f = (t: number) =>
      t > delta ? Math.pow(t, 3) : 3 * Math.pow(delta, 2) * (t - 4 / 29);

    const m = (L + 16) / 116;

    const x = 0.950489 * f(m + a / 500);
    const y = f(m);
    const z = 1.08884 * f(m - b / 200);

    return new Color(x, y, z);
  }

  static chroma(hue: number, L: number = 75) {
    const a = 127 * Math.cos(2 * Math.PI * hue);
    const b = 127 * Math.sin(2 * Math.PI * hue);

    return Color.fromCIELAB(L, a, b);
  }

  static mix(a: Color, b: Color, percent: number = 0.5) {
    const mixVal = (a: number, b: number) => a * percent + b * (1 - percent);
    return new Color(mixVal(a.x, b.x), mixVal(a.y, b.y), mixVal(a.z, b.z));
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

  toString() {
    const [r, g, b] = this.toRGB();
    return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
  }
}
