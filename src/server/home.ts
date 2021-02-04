import { Device } from "../device";
import { Platform } from "../platform";
import { createPlatform, PlatformData } from "./platforms";

export const homes: Map<string, Home> = new Map();

export class Home {
  id: string;
  name: string;

  platforms: Platform[] = [];
  devices: Device[] = [];

  private dids: Map<string, number> = new Map();
  private nextDid: number;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;

    // TODO: Load from save
    this.nextDid = 0;
  }

  getDeviceId(platform: Platform, uid?: string) {
    const did = uid === undefined ? platform.id : `${platform.id}|${uid}`;

    var id = this.dids.get(did);
    if (id === undefined) {
      id = this.nextDid++;
      this.dids.set(did, id);
    }
    return id;
  }

  async loadPlatform(id: string, data: PlatformData) {
    const platform = await createPlatform(id, this, data);
    if (platform === undefined) return;

    this.platforms.push(platform);
    await this.loadDevices(platform);
  }

  async loadDevices(platform: Platform) {
    const devs = await platform.devices();
    devs.forEach((d) => (this.devices[d.id] = d));
  }
}
