import axios from "axios";
import { load } from "cheerio";
import { Gallery } from "../gallery";

const api = axios.create({
  baseURL: "https://commons.wikimedia.org/w/api.php",
  params: {
    format: "json",
  },
});

export class Wikipedia extends Gallery {
  async load() {
    const res = api.get("", {
      params: {
        action: "parse",
        contentmodel: "wikitext",
        text: "{{Potd/{{CURRENTYEAR}}-{{CURRENTMONTH}}-{{CURRENTDAY2}} (en)}}",
      },
    });

    const res2 = await api.get("", {
      params: {
        action: "expandtemplates",
        prop: "wikitext",
        text: "{{Potd/{{CURRENTYEAR}}-{{CURRENTMONTH}}-{{CURRENTDAY2}}}}",
      },
    });

    const res3 = await api.get("", {
      params: {
        action: "query",
        prop: "imageinfo",
        iiprop: "url|user",
        titles: "Image:" + res2.data.expandtemplates.wikitext,
      },
    });
    const pages = res3.data.query.pages;
    const info = pages[Object.keys(pages)[0]].imageinfo[0];

    const $ = load((await res).data.parse.text["*"]);

    return {
      title: $("div").text().trim(),
      url: info.url,
      copyright: info.user,
    };
  }
}
