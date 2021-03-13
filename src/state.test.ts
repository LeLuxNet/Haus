import { Color } from "./lighting/color";
import { State } from "./state";

describe("State to JSON", () => {
  it("color", async () => {
    const json = State.toJSON(Color.fromRGB(255, 0, 0));

    expect(json).toStrictEqual({
      r: 255,
      b: 0,
      g: 0,
      h: 0,
      s: 255,
      v: 255,
    });
  });
});
