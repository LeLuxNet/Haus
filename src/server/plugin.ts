import { constants } from "fs";
import { access } from "fs/promises";
import { join } from "path";
import { Logger } from "../logger";
import { Platform } from "../platform";
import { Home } from "./home";

export interface PluginFile {
  create: (
    data: any,
    id: string,
    home: Home,
    logger: Logger
  ) => Promise<Platform | undefined>;
  discover?: (stealth: boolean, logger: Logger) => Promise<string[]>;
}

interface Plugin {
  name: string;
  file: string;

  import?: PluginFile;
  logger?: Logger;
}

export const plugins: {
  [key: string]: Plugin;
} = {
  "philips-hue": {
    name: "Philips Hue",
    file: "lighting/hue",
  },
  razer: {
    name: "Razer",
    file: "lighting/razer",
  },
  nanoleaf: {
    name: "Nanoleaf",
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

        const logger = new Logger(data.name);
        logger.debug("Loaded");
        data.logger = logger;

        data.import = plugin;
      }
    })
  );

  // console.log(plugins);
}
