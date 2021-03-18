import { Device } from "../device";
import { Logger } from "../logger";
import { Home } from "../server/home";
import { Trigger } from "../trigger";
import { exec } from "../utils/promisify";
import { pluginLibrary } from "./library";

export interface Plugin {
  name: string;

  deps?: Dependency[];

  create: (
    data: any,
    id: number,
    home: Home,
    logger: Logger
  ) => Promise<PluginInstance>;

  discover?: (logger: Logger) => {};
}

export interface LoadedPlugin extends Plugin {
  id: string;
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

export async function importPlugin(type: string) {
  const path = pluginLibrary[type];
  if (path === undefined) return;

  const plugin = (await import(path)).default as LoadedPlugin;
  plugin.id = type;

  return plugin;
}

export async function loadPlugin(data: any, home: Home) {
  const plugin = await importPlugin(data.type);
  if (plugin === undefined) return;

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
