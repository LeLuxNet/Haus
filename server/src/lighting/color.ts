export class Color {
  readonly x: number;
  readonly y: number;
  readonly z: number;

  static D50 = {
    2: {
      xn: 96.422,
      yn: 100,
      zn: 82.521,
    },
    10: {
      xn: 96.72,
      yn: 100,
      zn: 81.427,
    },
  };
  static D65 = {
    2: {
      xn: 95.047,
      yn: 100,
      zn: 108.883,
    },
    10: {
      xn: 94.811,
      yn: 100,
      zn: 107.304,
    },
  };

  static black = new Color(0, 0, 0);

  static white = new Color(Color.D65[2].xn, Color.D65[2].yn, Color.D65[2].zn);

  static ral = {
    1000: Color.fromRGB(205, 186, 136),
    1001: Color.fromRGB(208, 176, 132),
    1002: Color.fromRGB(210, 170, 109),
    1003: Color.fromRGB(249, 168, 0),
    1004: Color.fromRGB(228, 158, 0),
    1005: Color.fromRGB(203, 142, 0),
    1006: Color.fromRGB(226, 144, 0),
    1007: Color.fromRGB(232, 140, 0),
    1011: Color.fromRGB(175, 128, 79),
    1012: Color.fromRGB(221, 175, 39),
    1013: Color.fromRGB(227, 217, 198),
    1014: Color.fromRGB(221, 196, 154),
    1015: Color.fromRGB(230, 210, 181),
    1016: Color.fromRGB(241, 221, 56),
    1017: Color.fromRGB(246, 169, 80),
    1018: Color.fromRGB(250, 202, 48),
    1019: Color.fromRGB(164, 143, 122),
    1020: Color.fromRGB(160, 143, 101),
    1021: Color.fromRGB(246, 182, 0),
    1023: Color.fromRGB(247, 181, 0),
    1024: Color.fromRGB(186, 143, 76),
    1026: Color.fromRGB(255, 255, 0),
    1027: Color.fromRGB(167, 127, 14),
    1028: Color.fromRGB(255, 155, 0),
    1032: Color.fromRGB(226, 163, 0),
    1033: Color.fromRGB(249, 154, 28),
    1034: Color.fromRGB(235, 156, 82),
    1035: Color.fromRGB(144, 131, 112),
    1036: Color.fromRGB(128, 100, 63),
    1037: Color.fromRGB(240, 146, 0),
    2000: Color.fromRGB(218, 110, 0),
    2001: Color.fromRGB(186, 72, 27),
    2002: Color.fromRGB(191, 57, 34),
    2003: Color.fromRGB(246, 120, 40),
    2004: Color.fromRGB(226, 83, 3),
    2005: Color.fromRGB(255, 77, 6),
    2007: Color.fromRGB(255, 178, 0),
    2008: Color.fromRGB(237, 107, 33),
    2009: Color.fromRGB(222, 83, 7),
    2010: Color.fromRGB(208, 93, 40),
    2011: Color.fromRGB(226, 110, 14),
    2012: Color.fromRGB(213, 101, 77),
    2013: Color.fromRGB(146, 62, 37),
    3000: Color.fromRGB(167, 41, 32),
    3001: Color.fromRGB(155, 36, 35),
    3002: Color.fromRGB(155, 35, 33),
    3003: Color.fromRGB(134, 26, 34),
    3004: Color.fromRGB(107, 28, 35),
    3005: Color.fromRGB(89, 25, 31),
    3007: Color.fromRGB(62, 32, 34),
    3009: Color.fromRGB(109, 52, 45),
    3011: Color.fromRGB(121, 36, 35),
    3012: Color.fromRGB(198, 132, 109),
    3013: Color.fromRGB(151, 46, 37),
    3014: Color.fromRGB(203, 115, 117),
    3015: Color.fromRGB(216, 160, 166),
    3016: Color.fromRGB(166, 61, 47),
    3017: Color.fromRGB(203, 85, 93),
    3018: Color.fromRGB(199, 63, 74),
    3020: Color.fromRGB(187, 30, 16),
    3022: Color.fromRGB(207, 105, 85),
    3024: Color.fromRGB(255, 45, 33),
    3026: Color.fromRGB(255, 42, 27),
    3027: Color.fromRGB(171, 39, 60),
    3028: Color.fromRGB(204, 44, 36),
    3031: Color.fromRGB(166, 52, 55),
    3032: Color.fromRGB(112, 29, 35),
    3033: Color.fromRGB(165, 58, 45),
    4001: Color.fromRGB(129, 97, 131),
    4002: Color.fromRGB(141, 60, 75),
    4003: Color.fromRGB(196, 97, 140),
    4004: Color.fromRGB(101, 30, 56),
    4005: Color.fromRGB(118, 104, 154),
    4006: Color.fromRGB(144, 51, 115),
    4007: Color.fromRGB(71, 36, 60),
    4008: Color.fromRGB(132, 76, 130),
    4009: Color.fromRGB(157, 134, 146),
    4010: Color.fromRGB(188, 64, 119),
    4011: Color.fromRGB(110, 99, 135),
    4012: Color.fromRGB(107, 107, 127),
    5000: Color.fromRGB(49, 79, 111),
    5001: Color.fromRGB(15, 76, 100),
    5002: Color.fromRGB(0, 56, 123),
    5003: Color.fromRGB(31, 56, 85),
    5004: Color.fromRGB(25, 30, 40),
    5005: Color.fromRGB(0, 83, 135),
    5007: Color.fromRGB(55, 107, 140),
    5008: Color.fromRGB(43, 58, 68),
    5009: Color.fromRGB(34, 95, 120),
    5010: Color.fromRGB(0, 79, 124),
    5011: Color.fromRGB(26, 43, 60),
    5012: Color.fromRGB(0, 137, 182),
    5013: Color.fromRGB(25, 49, 83),
    5014: Color.fromRGB(99, 125, 150),
    5015: Color.fromRGB(0, 124, 176),
    5017: Color.fromRGB(0, 91, 140),
    5018: Color.fromRGB(5, 139, 140),
    5019: Color.fromRGB(0, 94, 131),
    5020: Color.fromRGB(0, 65, 75),
    5021: Color.fromRGB(0, 117, 119),
    5022: Color.fromRGB(34, 45, 90),
    5023: Color.fromRGB(66, 105, 140),
    5024: Color.fromRGB(96, 147, 172),
    5025: Color.fromRGB(33, 105, 124),
    5026: Color.fromRGB(15, 48, 82),
    6000: Color.fromRGB(60, 116, 96),
    6001: Color.fromRGB(54, 103, 53),
    6002: Color.fromRGB(50, 89, 40),
    6003: Color.fromRGB(80, 83, 60),
    6004: Color.fromRGB(2, 68, 66),
    6005: Color.fromRGB(17, 66, 50),
    6006: Color.fromRGB(60, 57, 46),
    6007: Color.fromRGB(44, 50, 34),
    6008: Color.fromRGB(55, 52, 42),
    6009: Color.fromRGB(39, 53, 42),
    6010: Color.fromRGB(77, 111, 57),
    6011: Color.fromRGB(108, 124, 89),
    6012: Color.fromRGB(48, 61, 58),
    6013: Color.fromRGB(125, 118, 90),
    6014: Color.fromRGB(71, 65, 53),
    6015: Color.fromRGB(61, 61, 54),
    6016: Color.fromRGB(0, 105, 76),
    6017: Color.fromRGB(88, 127, 64),
    6018: Color.fromRGB(97, 153, 59),
    6019: Color.fromRGB(185, 206, 172),
    6020: Color.fromRGB(55, 66, 47),
    6021: Color.fromRGB(138, 153, 119),
    6022: Color.fromRGB(58, 51, 39),
    6024: Color.fromRGB(0, 131, 81),
    6025: Color.fromRGB(94, 110, 59),
    6026: Color.fromRGB(0, 95, 78),
    6027: Color.fromRGB(126, 186, 181),
    6028: Color.fromRGB(49, 84, 66),
    6029: Color.fromRGB(0, 111, 61),
    6032: Color.fromRGB(35, 127, 82),
    6033: Color.fromRGB(70, 135, 127),
    6034: Color.fromRGB(122, 172, 172),
    6035: Color.fromRGB(25, 77, 37),
    6036: Color.fromRGB(4, 87, 75),
    6037: Color.fromRGB(0, 139, 41),
    6038: Color.fromRGB(0, 181, 26),
    7000: Color.fromRGB(122, 136, 142),
    7001: Color.fromRGB(140, 150, 157),
    7002: Color.fromRGB(129, 120, 99),
    7003: Color.fromRGB(122, 118, 105),
    7004: Color.fromRGB(155, 155, 155),
    7005: Color.fromRGB(108, 110, 107),
    7006: Color.fromRGB(118, 106, 94),
    7008: Color.fromRGB(116, 94, 61),
    7009: Color.fromRGB(93, 96, 88),
    7010: Color.fromRGB(88, 92, 86),
    7011: Color.fromRGB(82, 89, 93),
    7012: Color.fromRGB(87, 93, 94),
    7013: Color.fromRGB(87, 80, 68),
    7015: Color.fromRGB(79, 83, 88),
    7016: Color.fromRGB(56, 62, 66),
    7021: Color.fromRGB(47, 50, 52),
    7022: Color.fromRGB(76, 74, 68),
    7023: Color.fromRGB(128, 128, 118),
    7024: Color.fromRGB(69, 73, 78),
    7026: Color.fromRGB(55, 67, 69),
    7030: Color.fromRGB(146, 142, 133),
    7031: Color.fromRGB(91, 104, 109),
    7032: Color.fromRGB(181, 176, 161),
    7033: Color.fromRGB(127, 130, 116),
    7034: Color.fromRGB(146, 136, 111),
    7035: Color.fromRGB(197, 199, 196),
    7036: Color.fromRGB(151, 147, 146),
    7037: Color.fromRGB(122, 123, 122),
    7038: Color.fromRGB(176, 176, 169),
    7039: Color.fromRGB(107, 102, 94),
    7040: Color.fromRGB(152, 158, 161),
    7042: Color.fromRGB(142, 146, 145),
    7043: Color.fromRGB(79, 82, 80),
    7044: Color.fromRGB(183, 179, 168),
    7045: Color.fromRGB(141, 146, 149),
    7046: Color.fromRGB(127, 134, 138),
    7047: Color.fromRGB(200, 200, 199),
    7048: Color.fromRGB(129, 123, 115),
    8000: Color.fromRGB(137, 105, 62),
    8001: Color.fromRGB(157, 98, 43),
    8002: Color.fromRGB(121, 77, 62),
    8003: Color.fromRGB(126, 75, 38),
    8004: Color.fromRGB(141, 73, 49),
    8007: Color.fromRGB(112, 69, 42),
    8008: Color.fromRGB(114, 74, 37),
    8011: Color.fromRGB(90, 56, 38),
    8012: Color.fromRGB(102, 51, 43),
    8014: Color.fromRGB(74, 53, 38),
    8015: Color.fromRGB(94, 47, 38),
    8016: Color.fromRGB(76, 43, 32),
    8017: Color.fromRGB(68, 47, 41),
    8019: Color.fromRGB(61, 54, 53),
    8022: Color.fromRGB(26, 23, 24),
    8023: Color.fromRGB(164, 87, 41),
    8024: Color.fromRGB(121, 80, 56),
    8025: Color.fromRGB(117, 88, 71),
    8028: Color.fromRGB(81, 58, 42),
    8029: Color.fromRGB(127, 64, 49),
    9001: Color.fromRGB(233, 224, 210),
    9002: Color.fromRGB(215, 213, 203),
    9003: Color.fromRGB(236, 236, 231),
    9004: Color.fromRGB(43, 43, 44),
    9005: Color.fromRGB(14, 14, 16),
    9006: Color.fromRGB(161, 161, 160),
    9007: Color.fromRGB(135, 133, 129),
    9010: Color.fromRGB(241, 236, 225),
    9011: Color.fromRGB(39, 41, 43),
    9016: Color.fromRGB(241, 240, 234),
    9017: Color.fromRGB(42, 41, 42),
    9018: Color.fromRGB(200, 203, 196),
    9022: Color.fromRGB(133, 133, 131),
    9023: Color.fromRGB(121, 123, 122),
  };

  /**
   * @param {number} x X (0-1)
   * @param {number} y Y (0-1)
   * @param {number} z Z (0-1)
   */
  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * @param {number} r Red (0-255)
   * @param {number} g Green (0-255)
   * @param {number} b Blue (0-255)
   */
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

  /**
   * @param {number} h Hue (0-360)
   * @param {number} s Saturation (0-255)
   * @param {number} v Value/Brightness (0-255)
   */
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

  /**
   * @param {number} L Lightness (-128-127)
   * @param {number} a green-red (-128-127)
   * @param {number} b blue-yellow (0-100)
   */
  static fromCIELAB(L: number, a: number, b: number, n = Color.D65[2]) {
    const delta = 6 / 29;
    const f = (t: number) =>
      t > delta ? Math.pow(t, 3) : 3 * Math.pow(delta, 2) * (t - 4 / 29);

    const m = (L + 16) / 116;

    const x = n.xn * f(m + a / 500);
    const y = n.yn * f(m);
    const z = n.zn * f(m - b / 200);

    return new Color(x / 100, y / 100, z / 100);
  }

  /**
   * @param {number} x x ()
   * @param {number} y y ()
   * @param {number} Y Y ()
   */
  static fromXYY(x: number, y: number, Y: number) {
    if (y === 0) {
      return new Color(0, 0, 0);
    }

    return new Color((x * Y) / y, Y, ((1 - x - y) * Y) / y);
  }

  /**
   * @param {number} T Color temperature in Kelvin
   */
  static fromCCT(T: number) {
    var x: number;
    var y: number;

    if (T <= 4000) {
      x =
        -0.2661239 * (1e9 / Math.pow(T, 3)) -
        0.2343589 * (1e6 / Math.pow(T, 2)) +
        0.8776956 * (1e3 / T) +
        0.17991;

      if (T <= 2222) {
        y =
          -1.1063814 * Math.pow(x, 3) -
          1.3481102 * Math.pow(x, 2) +
          2.18555832 * x -
          0.20219683;
      } else {
        y =
          -0.9549476 * Math.pow(x, 3) -
          1.3481102 * Math.pow(x, 2) +
          2.09137015 * x -
          0.16748867;
      }
    } else {
      x =
        -3.0258469 * (1e9 / Math.pow(T, 3)) +
        2.1070379 * (1e6 / Math.pow(T, 2)) +
        0.2226347 * (1e3 / T) +
        0.24039;

      y =
        3.081758 * Math.pow(x, 3) -
        5.8733867 * Math.pow(x, 2) +
        3.75112997 * x -
        0.37001483;
    }

    return Color.fromXYY(x, y, 1);
  }

  /**
   * @param {number} L Lightness (0-100)
   * @param {number} C Chroma (0-127)
   * @param {number} h Hue (0-1)
   */
  static fromLCh(L: number = 75, C: number = 127, h: number) {
    const a = C * Math.cos(2 * Math.PI * h);
    const b = C * Math.sin(2 * Math.PI * h);

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

  toJSON() {
    const [r, g, b] = this.toRGB();
    const [h, s, v] = this.toHSV();
    return { r, g, b, h, s, v };
  }
}
