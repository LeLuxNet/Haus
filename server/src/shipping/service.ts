import { Shipment } from "./entry";

export abstract class ShippingService {
  codes: string[] = [];

  constructor() {
    setInterval(
      () =>
        this.update().then((d) => console.log(JSON.stringify(d, undefined, 2))),
      10 * 60 * 1000
    ); // 10min
  }

  abstract update(): Promise<Shipment[]>;
}
