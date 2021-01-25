import axios from "axios";
import { Shipment, ShipmentEntry, ShipmentStatus } from "../entry";
import { ShippingService } from "../service";

export class DHL extends ShippingService {
  async update() {
    return await Promise.all(
      this.codes.map(
        async (c): Promise<Shipment> => {
          const res = await axios.get(
            "https://api-eu.dhl.com/track/shipments",
            {
              params: {
                trackingNumber: c,
              },
              headers: {
                "DHL-API-Key": "demo-key",
              },
            }
          );
          const data = res.data.shipments[0];

          return {
            status: mapStatus(data.status.statusCode),
            entries: data.events.map(
              (e: any): ShipmentEntry => {
                return {
                  status: mapStatus(e.statusCode),
                  message: e.status,
                  time: new Date(e.timestamp),
                };
              }
            ),
          };
        }
      )
    );
  }
}

function mapStatus(status: string) {
  if (status === "unknown") {
    return undefined;
  }

  const map: { [key: string]: ShipmentStatus } = {
    "pre-transit": ShipmentStatus.processing,
    transit: ShipmentStatus.transit,
    delivered: ShipmentStatus.delivered,
    failure: ShipmentStatus.failure,
  };
  return map[status];
}
