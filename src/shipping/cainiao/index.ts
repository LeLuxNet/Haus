import axios from "axios";
import { load } from "cheerio";
import { Shipment, ShipmentEntry, ShipmentStatus } from "../entry";
import { ShippingService } from "../service";

function parseState(state: string) {
  if (
    state === "PICKEDUP" ||
    state === "SHIPPING" ||
    state.startsWith("DEPART_") ||
    state.startsWith("ARRIVED_")
  ) {
    return ShipmentStatus.transit;
  } else if (state.startsWith("RETURNED_")) {
    return ShipmentStatus.returned;
  } else if (state === "SIGNIN") {
    return ShipmentStatus.delivered;
  } else if (state.startsWith("RDESTORYED_")) {
    return ShipmentStatus.failure;
  }
  return undefined;
}

export class Cainiao extends ShippingService {
  async update() {
    const res = await axios.get("https://global.cainiao.com/detail.htm", {
      params: {
        mailNoList: this.codes.join(","),
      },
    });
    const $ = load(res.data);

    const data = JSON.parse($("#waybill_list_val_box").text());

    return data.data.map(
      (d: any): Shipment => {
        const entries = d.section2.detailList.map(
          (e: any): ShipmentEntry => {
            return {
              status: parseState(e.status),
              message: e.desc,
              time: new Date(e.time),
            };
          }
        );

        return {
          status: parseState(d.status),
          entries,
        };
      }
    );
  }
}
