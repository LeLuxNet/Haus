import { Razer } from ".";
import { Update } from "../../update";

export class RazerDevice {
  razer: Razer;

  update: Update;

  constructor(razer: Razer, fun: () => Promise<void>) {
    this.razer = razer;
    this.update = new Update(fun);
  }
}
