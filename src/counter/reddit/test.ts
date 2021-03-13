import reddit from ".";
import { loadPlugin } from "../../plugins";
import { Home } from "../../server/home";
import { State } from "../../state";

describe("Reddit score", () => {
  it("should be in range", async () => {
    const home = new Home("", "");
    const counter = await loadPlugin(reddit, { id: "87" }, home);

    const val = await (counter.fields!.val as State<number>).get!();

    expect(val).toBeGreaterThanOrEqual(0);
    expect(val).toBeLessThan(200);
  });
});
