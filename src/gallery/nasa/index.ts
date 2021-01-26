import axios from "axios";
import { Gallery } from "../gallery";

export class NASA extends Gallery {
  async load() {
    const res = await axios.get("https://api.nasa.gov/planetary/apod", {
      params: {
        api_key: "DEMO_KEY",
      },
    });

    return {
      url: res.data.hdurl,
      title: res.data.title,
      description: res.data.explanation,
    };
  }
}
