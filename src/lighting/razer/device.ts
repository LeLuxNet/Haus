import { Razer } from ".";
import { Device } from "../../device";
import { Update } from "../../update";

export class RazerDevice extends Device {
  razer: Razer;

  update: Update;

  constructor(razer: Razer, fun: () => Promise<void>, type: string) {
    super(razer.home.getDeviceId(razer, type), razer);
    this.razer = razer;
    this.update = new Update(fun);
  }
}
