import axios from "axios";
import { Gallery } from "../gallery";
import { imageUrl } from "../wikimedia";

const api = axios.create({
  baseURL: "https://en.wikipedia.org/w/api.php",
  params: {
    format: "json",
  },
});

export class Wikipedia extends Gallery {
  async load() {
    const res = api.get("", {
      params: {
        action: "expandtemplates",
        prop: "wikitext",
        text:
          "{{POTD/{{CURRENTYEAR}}-{{CURRENTMONTH}}-{{CURRENTDAY2}}|texttitle}}",
      },
    });

    const res2 = await api.get("", {
      params: {
        action: "expandtemplates",
        prop: "wikitext",
        text: "{{POTD/{{CURRENTYEAR}}-{{CURRENTMONTH}}-{{CURRENTDAY2}}|image}}",
      },
    });

    const { url } = await imageUrl(api, res2.data.expandtemplates.wikitext);

    return {
      title: (await res).data.expandtemplates.wikitext,
      url,
    };
  }
}
