import { Trigger } from "../trigger";
import { exec } from "../utils/promisify";

export interface Plugin {
  name: string;

  deps?: Dependency[];

  create: (data: any) => Promise<PluginInstance>;
}

export interface PluginInstance {
  readonly fields: { [key: string]: Trigger<any> | undefined };
}

interface Dependency {
  name: string;
  version: string;
}

export async function loadPlugin(plugin: Plugin, data: any) {
  if (plugin.deps !== undefined) {
    await installDeps(plugin.deps);
  }

  return await plugin.create(data);
}

async function installDeps(dep: Dependency[]) {
  if (dep.length === 0) return;

  await exec(
    "npm install " + dep.map((d) => `${d.name}@${d.version}`).join(" ")
  );
}
