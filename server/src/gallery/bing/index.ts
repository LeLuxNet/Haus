import axios from "axios";
import { Gallery } from "../gallery";

interface BingImage {
  url: string;
  title: string;
  copyright: string;
}

export class Bing extends Gallery {
  async load() {
    const res = await axios.get("https://www.bing.com/HPImageArchive.aspx", {
      params: { format: "js", idx: 0, n: 1 },
    });
    const img: BingImage = res.data.images[0];
    const [description, copyright] = img.copyright.split(" (");

    return {
      url: `https://bing.com${img.url}`,
      title: img.title,
      description,
      copyright: copyright.slice(0, -1),
    };
  }
}
