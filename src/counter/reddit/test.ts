import reddit from ".";
import { State } from "../../state";

describe("Reddit score", () => {
  it("should be in range", async () => {
    const counter = await reddit.create({ id: "87" });

    const val = await (counter.fields.val as State<number>).get!();

    expect(val).toBeGreaterThanOrEqual(0);
    expect(val).toBeLessThan(200);
  });
});
