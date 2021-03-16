import { Device } from "../device";
import { PluginInstance } from "../plugins";
import { Trigger } from "../trigger";

export const homes: Map<string, Home> = new Map();

export class Home extends Trigger<any> {
  id: string;
  name: string;

  plugins: (PluginInstance | undefined)[] = [];
  devices: (Device | undefined)[] = [];

  private dIds: Map<string, number> = new Map();
  private nextDId: number;

  constructor(id: string, name: string) {
    super();
    this.id = id;
    this.name = name;

    // TODO: Load from save
    this.nextDId = 1;
  }

  getDeviceId(plugin: PluginInstance, uid?: string) {
    const did =
      uid === undefined ? plugin.id.toString() : `${plugin.id}|${uid}`;

    var id = this.dIds.get(did);
    if (id === undefined) {
      id = this.nextDId++;
      this.dIds.set(did, id);
    }
    return id;
  }

  /* async loadPlatform(id: string, data: PlatformData) {
    const platform = await createPlatform(id, this, data);
    if (platform === undefined) return;

    this.platforms.push(platform);
    // await this.loadDevices(platform);
  } */

  async register(plugin: PluginInstance) {
    if (plugin.devices === undefined) return;

    const devs = await plugin.devices();
    devs.forEach((d) => {
      this.devices[d.id] = d;
      if (this.subscriptions.length < 0) {
        this.devices[d.id]?.subscribe((v) => this.trigger({ [d.id]: v }), this);
      }
    });
  }

  subscribe(fn: (val: any) => void, anchor: any) {
    const unsub = super.subscribe(fn, anchor);

    if (this.subscriptions.length === 1) {
      this.devices.forEach((val, i) => {
        val?.subscribe((v) => this.trigger({ [i]: v }), this);
      });
    }

    return () => {
      unsub();

      if (this.subscriptions.length === 0) {
        this.devices.forEach((val) => {
          val?.disconnectAnchor(this);
        });
      }
    };
  }
}
