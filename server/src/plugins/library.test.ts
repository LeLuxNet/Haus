import { pluginLibrary } from "./library";

describe("Check if filepaths in the plugin library are correct", () => {
  Object.entries(pluginLibrary).forEach(([id, path]) => {
    it(id, async () => {
      const plugin = (await import(path)).default;

      expect(typeof plugin.name).toBe("string");
      expect(plugin.create).toBeInstanceOf(Function);
    });
  });
});
