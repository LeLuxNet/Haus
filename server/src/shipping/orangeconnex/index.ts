import axios from "axios";
import { Shipment, ShipmentEntry, ShipmentStatus } from "../entry";
import { ShippingService } from "../service";

const states: { [key: string]: ShipmentStatus } = {
  IN_TRANSIT: ShipmentStatus.transit,
};

export class OrangeConnex extends ShippingService {
  async update() {
    const res = await axios.post(
      "https://azure-cn.orangeconnex.com/oc/capricorn-website/website/v1/tracking/traces",
      { trackingNumbers: this.codes }
    );
    const data = res.data.result.waybills;

    return data.map(
      (c: any): Shipment => {
        console.log(c);

        const entries = c.traces.map(
          (t: any): ShipmentEntry => {
            return {
              message: t.eventDesc,
              time: new Date(t.oprTimestamp),
              loc:
                t.oprCity !== undefined
                  ? `${t.oprCity}, ${t.oprCountry}`
                  : t.oprCountry,
            };
          }
        );

        return {
          status: states[c.isEventCode],
          entries,
        };
      }
    );
  }
}
