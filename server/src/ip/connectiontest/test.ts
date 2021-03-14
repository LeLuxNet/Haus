import connectioncheck, { services } from ".";
import { loadPlugin } from "../../plugins";
import { Home } from "../../server/home";
import { State } from "../../state";

describe("Connection check", () => {
  Object.keys(services).forEach((service) =>
    it(service, async () => {
      const home = new Home("", "");
      const plugin = await loadPlugin(connectioncheck, { service }, home);

      const state = plugin.fields!.connected as State<boolean>;
      const val = await state.get!();

      expect(val).toBeTruthy();
    })
  );
});
