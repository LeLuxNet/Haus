import { Platform } from "./platform";
import { State } from "./state";

export abstract class Device {
  id: number;
  name?: string;
  platform: Platform;

  reachable?: State<boolean>;
  battery?: State<boolean>;

  constructor(id: number, platform: Platform) {
    this.id = id;
    this.platform = platform;
  }

  abstract get type(): string;

  get data() {
    return {};
  }
}
