import { Device } from "../device";
import { Platform } from "../platform";
import { Trigger } from "../trigger";
import { createPlatform, PlatformData } from "./platforms";

export const homes: Map<string, Home> = new Map();

export class Home extends Trigger<any> {
  id: string;
  name: string;

  platforms: Platform[] = [];
  devices: Device[] = [];

  subscribers: ((val: any) => void)[] = [];

  private dIds: Map<string, number> = new Map();
  private nextDId: number;

  constructor(id: string, name: string) {
    super();
    this.id = id;
    this.name = name;

    // TODO: Load from save
    this.nextDId = 1;
  }

  getDeviceId(platform: Platform, uid?: string) {
    const did = uid === undefined ? platform.id : `${platform.id}|${uid}`;

    var id = this.dIds.get(did);
    if (id === undefined) {
      id = this.nextDId++;
      this.dIds.set(did, id);
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

  subscribe(fn: (val: any) => void, anchor: any) {
    const unsub = super.subscribe(fn, anchor);

    if (this.subscriptions.length === 1) {
      this.devices.forEach((val, i) => {
        if (val !== undefined) {
          val.subscribe((v) => this.trigger({ [i]: v }), this);
        }
      });
    }

    return () => {
      unsub();

      if (this.subscriptions.length === 0) {
        this.devices.forEach((val) => {
          if (val !== undefined) {
            val.disconnectAnchor(this);
          }
        });
      }
    };
  }
}
