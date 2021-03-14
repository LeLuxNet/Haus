import axios from "axios";
import { load } from "cheerio";

export async function preview(url: string) {
  const res = await axios.get(url);
  const $ = load(res.data);

  const meta = (prop: string) => $(`[property="${prop}"]`)?.attr("content");

  const title = meta("og:title");
  const description = meta("og:description");

  const image = meta("og:image");
  const video = meta("og:video");

  console.log(title);
  console.log(description);
  console.log(image);
  console.log(video);
}
