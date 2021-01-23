import { Vector2 } from "./vector2";

describe("Magnitude", () => {
  it("should 5", async () => {
    const v = new Vector2(3, 4);

    expect(v.magnitude).toBe(5);
  });
});

describe("Nearest point", () => {
  const a = new Vector2(1, 2);
  const b = new Vector2(-2, 2);

  it("should be a", async () => {
    const v = new Vector2(0, 0);

    expect(v.nearestPoint([a, b])).toBe(a);
  });

  it("should be b", async () => {
    const v = new Vector2(-1, -2);

    expect(v.nearestPoint([a, b])).toBe(b);
  });
});
