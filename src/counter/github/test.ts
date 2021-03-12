import github from ".";
import { State } from "../../state";

describe("GitHub follower counter", () => {
  it("should be in range", async () => {
    const counter = await github.create({ username: "ginnyTheCat" });

    const val = await (counter.fields.val as State<number>).get!();
    const avatar = await (counter.fields.avatar as State<string>).get!();

    expect(val).toBeGreaterThanOrEqual(0);
    expect(
      avatar.startsWith("https://avatars.githubusercontent.com/")
    ).toBeTruthy();
  });
});
