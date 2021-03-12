import connectioncheck, { services } from ".";
import { loadPlugin } from "../../plugins";
import { State } from "../../state";

describe("Connection check", () => {
  Object.keys(services).forEach((service) =>
    it(service, async () => {
      const plugin = await loadPlugin(connectioncheck, { service });
      const state = plugin.fields!.connected as State<boolean>;
      const val = await state.get!();

      expect(val).toBeTruthy();
    })
  );
});
