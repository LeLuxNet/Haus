import { AxiosInstance } from "axios";
import { Device } from "../../device";
import { Platform } from "../../platform";
import { Home } from "../../server/home";
import { Update } from "../../update";

export abstract class RazerDevice extends Device {
  api: AxiosInstance;
  update: Update;

  constructor(
    api: AxiosInstance,
    platform: Platform,
    home: Home,
    type: string,
    fun: () => Promise<void>
  ) {
    super(home.getDeviceId(platform, type), platform);
    this.api = api;
    this.update = new Update(fun);
  }

  get values() {
    return {};
  }
}
