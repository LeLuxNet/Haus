import { importPlugin } from ".";
import { pluginLibrary } from "./library";

describe("Check if filepaths in the plugin library are correct", () => {
  Object.keys(pluginLibrary).forEach((id) => {
    it(id, async () => {
      const plugin = await importPlugin(id);

      expect(typeof plugin!.name).toBe("string");
      expect(plugin!.create).toBeInstanceOf(Function);
    });
  });
});
