import axios from "axios";
import { Gallery } from "../gallery";

const subreddit = "earthporn";

export class Reddit extends Gallery {
  async load() {
    const res = await axios.get(
      `https://www.reddit.com/r/${subreddit}/top.json`,
      { params: { t: "day", limit: 1 } }
    );
    const data = res.data.data.children[0].data;

    return {
      title: data.title,
      url: data.preview.images[0].source.url.replace(/&amp;/g, "&"),
      // copyright: `u/${data.author}`,
    };
  }
}
