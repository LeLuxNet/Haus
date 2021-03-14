import axios from "axios";
import { Gallery } from "../gallery";

export class WindowsSpotlight extends Gallery {
  async load() {
    const res = await axios.get("https://arc.msn.com/v3/Delivery/Placement", {
      params: {
        pid: "338387",
        fmt: "json",
        ctry: "US",
        lc: "en-US",
        cdm: "1",
      },
    });

    const o = JSON.parse(res.data.batchrsp.items[0].item).ad;

    return {
      url: o.image_fullscreen_001_landscape.u,
      title: o.title_text.tx,
      copyright: o.copyright_text.tx,
    };
  }
}
