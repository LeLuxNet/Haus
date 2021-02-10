import { Vector3 } from "./vector3";

describe("Magnitude", () => {
  it("should 5", async () => {
    const v = new Vector3(3, 0, 4);

    expect(v.magnitude).toBe(5);
  });
});

describe("Nearest point", () => {
  const a = new Vector3(1, 2, 1);
  const b = new Vector3(-2, 2, 1);

  it("should be a", async () => {
    const v = new Vector3(0, 0, 0);

    expect(v.nearestPoint([a, b])).toBe(a);
  });

  it("should be b", async () => {
    const v = new Vector3(-1, -2, 0);

    expect(v.nearestPoint([a, b])).toBe(b);
  });
});
