import { Device } from "../device";
import { Logger } from "../logger";
import { Trigger } from "../trigger";
import { exec } from "../utils/promisify";

export interface Plugin {
  name: string;

  deps?: Dependency[];

  create: (data: any, logger: Logger) => Promise<PluginInstance>;
}

export interface PluginInstance {
  readonly fields?: { [key: string]: Trigger<any> | undefined };
  readonly devices?: Promise<Device[]>;
}

interface Dependency {
  name: string;
  version: string;
}

export async function loadPlugin(plugin: Plugin, data: any) {
  if (plugin.deps !== undefined) {
    await installDeps(plugin.deps);
  }

  const logger = new Logger(plugin.name);
  const instance = await plugin.create(data, logger);

  logger.debug("Loaded");
  return instance;
}

async function installDeps(dep: Dependency[]) {
  if (dep.length === 0) return;

  await exec(
    "npm install " + dep.map((d) => `${d.name}@${d.version}`).join(" ")
  );
}
