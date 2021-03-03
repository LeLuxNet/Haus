import axios from "axios";
import { load } from "cheerio";
import { URLSearchParams } from "url";
import { Shipment, ShipmentEntry, ShipmentStatus } from "../entry";
import { ShippingService } from "../service";

const states: { [key: string]: ShipmentStatus } = {
  Processing: ShipmentStatus.processing,
  Transit: ShipmentStatus.transit,
  Returned: ShipmentStatus.returned,
  Delivered: ShipmentStatus.delivered,
};

export class YunTrack extends ShippingService {
  async getCode(): Promise<string> {
    const res = await axios.post("https://www.yuntrack.com/Track/GetIpPass");
    if (!res.data.ipPass) {
      return res.data.code;
    }

    const params2 = new URLSearchParams();
    params2.append("spec", "300*200");
    params2.append("action", "getcode");

    const res2 = await axios.post(
      "https://www.yuntrack.com/Validation/ProcessRequest",
      params2
    );
    const data2 = JSON.parse(res2.data);

    const step = 5;
    for (let i = 0; i < 300; i += step) {
      const params3 = new URLSearchParams();
      params3.append("action", "check");
      params3.append("point", i.toString());
      params3.append("key", data2.key);

      const res3 = await axios.post(
        "https://www.yuntrack.com/Validation/ProcessRequest",
        params3
      );
      const data3 = JSON.parse(res3.data);

      if (data3.state === 0) {
        return data3.code;
      }
    }

    throw "No code found";
  }

  async update(): Promise<Shipment[]> {
    const code = await this.getCode();

    const params = new URLSearchParams();
    this.codes.forEach((c) => params.append("numbers[]", c));
    params.append("code", code);

    const res = await axios.post(
      "https://www.yuntrack.com/Track/PartialDetail",
      params
    );

    const $ = load(res.data);

    return $(".T_item")
      .map(
        (_, e): Shipment => {
          const entries: ShipmentEntry[] = $(e)
            .find("li")
            .map(
              (_, el): ShipmentEntry => {
                const [msg, loc] = $(el)
                  .find(".wd_message")
                  .text()
                  .trim()
                  .split(" ----");

                const [date, time] = $(el)
                  .find(".wd_time")
                  .text()
                  .trim()
                  .split(" ");
                const [year, month, day] = date.split("/");
                const [hours, minutes, seconds] = time.split(":");

                return {
                  message: msg,
                  time: new Date(
                    parseInt(year),
                    parseInt(month),
                    parseInt(day),
                    parseInt(hours),
                    parseInt(minutes),
                    parseInt(seconds)
                  ),
                  loc: loc,
                };
              }
            )
            .get();

          return {
            status: states[$(e).attr("date")!],
            entries: entries,
          };
        }
      )
      .get();
  }
}
