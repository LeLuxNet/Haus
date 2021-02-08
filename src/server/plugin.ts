import { constants } from "fs";
import { access } from "fs/promises";
import { join } from "path";
import { Platform } from "../platform";
import { Home } from "./home";

export interface PluginFile {
  create: (data: any, id: string, home: Home) => Promise<Platform | undefined>;
  discover?: (stealth: boolean) => Promise<string[]>;
}

export const plugins: {
  [key: string]: {
    file: string;
    import?: PluginFile;
  };
} = {
  "philips-hue": {
    file: "lighting/hue",
  },
  razer: {
    file: "lighting/razer",
  },
  nanoleaf: {
    file: "lighting/nanoleaf",
  },
};

export async function loadPlugins() {
  await Promise.all(
    Object.entries(plugins).map(async ([type, data]) => {
      const path = join("..", data.file);
      const exists = access(path, constants.F_OK)
        .then(() => true)
        .catch(() => false);

      if (exists) {
        const plugin: PluginFile = await import(path);
        if (plugin.create === undefined) {
          console.warn(`'${type}' has no create function`);
          return;
        }

        console.log(`Imported '${type}'`);
        data.import = plugin;
      }
    })
  );

  // console.log(plugins);
}
