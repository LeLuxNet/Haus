import { Color } from "./color";

describe("HSV2RGB", () => {
  it("should be red", async () => {
    const [r, g, b] = Color.fromHSV(0, 255, 255).toRGB();

    expect(r).toBe(255);
    expect(g).toBe(0);
    expect(b).toBe(0);
  });

  it("should be purple", async () => {
    const [r, g, b] = Color.fromHSV(300, 255, 255).toRGB();

    expect(r).toBe(255);
    expect(g).toBe(0);
    expect(b).toBe(255);
  });
});

describe("RGB2HSV", () => {
  it("should be red", async () => {
    const [h, s, v] = Color.fromRGB(255, 0, 0).toHSV();

    expect(h).toBe(0);
    expect(s).toBe(255);
    expect(v).toBe(255);
  });

  it("should be purple", async () => {
    const [h, s, v] = Color.fromRGB(255, 0, 255).toHSV();

    expect(h).toBe(300);
    expect(s).toBe(255);
    expect(v).toBe(255);
  });
});

describe("XYZ2RGB", () => {
  it("should be red", async () => {
    const [r, g, b] = new Color(41.246, 21.267, 1.933).toRGB();

    expect(r).toBe(255);
    expect(g).toBe(0);
    expect(b).toBe(0);
  });
});

describe("CIELAB2XYZ", () => {
  it("should be red", async () => {
    const col = Color.fromCIELAB(53.241, 80.092, 67.203);

    expect(col.x).toBe(41.246604320962945);
    expect(col.y).toBe(21.267479688878765);
    expect(col.z).toBe(1.9334690576577374);
  });
});
