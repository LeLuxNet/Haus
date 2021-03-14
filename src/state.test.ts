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

describe("Create state", () => {
  it("initial", async () => {
    const state = new State({ initial: 5 });
    expect(state.last).toBe(5);
  });

  it("get", async () => {
    const state = new State({ get: async () => 5 });
    expect(state.last).toBe(undefined);
  });
});

describe("Get state", () => {
  it("get", async () => {
    const state = new State({ get: async () => 5 });
    expect(await state.get!()).toBe(5);
  });
});
