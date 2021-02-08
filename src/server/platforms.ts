import { Platform } from "../platform";
import { Home } from "./home";
import { plugins } from "./plugin";

export interface PlatformData {
  type: string;
  [key: string]: string;
}

export async function createPlatform(
  id: string,
  home: Home,
  data: PlatformData
): Promise<Platform | undefined> {
  const plugin = plugins[data.type];
  if (plugin === undefined || plugin.import === undefined) return undefined;

  return plugin.import.create(data, id, home);
}
