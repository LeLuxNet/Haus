import { loadPlugin } from "../../plugins";
import { Home } from "../../server/home";
import { State } from "../../state";

describe("GitHub follower counter", () => {
  it("should be in range", async () => {
    const home = new Home("", "");
    const counter = await loadPlugin(
      { type: "github-followers", username: "ginnyTheCat" },
      home
    );

    const val = await (counter!.fields!.val as State<number>).get!();
    const avatar = await (counter!.fields!.avatar as State<string>).get!();

    expect(val).toBeGreaterThanOrEqual(0);
    expect(
      avatar.startsWith("https://avatars.githubusercontent.com/")
    ).toBeTruthy();
  });
});
