import { Device } from "../device";
import { Logger } from "../logger";
import { Home } from "../server/home";
import { Trigger } from "../trigger";
import { exec } from "../utils/promisify";

export interface Plugin {
  name: string;
  id: string;

  deps?: Dependency[];

  create: (
    data: any,
    id: number,
    home: Home,
    logger: Logger
  ) => Promise<PluginInstance>;
}

export interface PluginInstance {
  id: number;

  readonly fields?: { [key: string]: Trigger<any> | undefined };
  devices?(): Promise<Device[]>;

  stop?(): Promise<void>;
}

interface Dependency {
  name: string;
  version: string;
}

export async function loadPlugin(plugin: Plugin, data: any, home: Home) {
  const logger = new Logger(plugin.name);

  if (plugin.deps !== undefined) {
    await installDeps(plugin.deps, logger);
  }

  const id = home.plugins.push(undefined);

  const instance = await plugin.create(data, id, home, logger);

  home.plugins[id] = instance;
  await home.register(instance);

  logger.debug("Loaded");
  return instance;
}

async function installDeps(dep: Dependency[], logger: Logger) {
  if (dep.length === 0) return;

  logger.info(
    `Installing ${dep.length} dependenc${dep.length === 1 ? "y" : "ies"}`
  );

  await exec(
    "npm install --save " + dep.map((d) => `${d.name}@${d.version}`).join(" ")
  );
}
