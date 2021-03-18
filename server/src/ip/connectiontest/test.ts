import { services } from ".";
import { loadPlugin } from "../../plugins";
import { Home } from "../../server/home";
import { State } from "../../state";

describe("Connection test", () => {
  Object.keys(services).forEach((service) =>
    it(service, async () => {
      const home = new Home("", "");
      const plugin = await loadPlugin(
        { type: "connection-test", service },
        home
      );

      const state = plugin!.fields!.connected as State<boolean>;
      const val = await state.get!();

      expect(val).toBeTruthy();
    })
  );
});
