import axios from "axios";
import { State } from "../../state";
import { Update } from "../../update";
import { Counter } from "../counter";

export class YouTube extends Counter {
  constructor(id: string, key: string) {
    const update = new Update(() =>
      request(id, key, "snippet").then((d) => {
        this.name.update(d.title);
        avatar.update(d.thumbnails.high.url);
      })
    );

    const avatar = new State<string>({ update });

    super(
      new State({ update }),
      new State({
        get: () =>
          request(id, key, "statistics").then((d) => d.subscriberCount),
        autoUpdate: 60,
      })
    );

    this.avatar = avatar;
  }
}

async function request(id: string, key: string, part: string) {
  const res = await axios.get(
    "https://www.googleapis.com/youtube/v3/channels",
    {
      params: {
        id,
        key,
        part,
      },
    }
  );

  return res.data.items[0][part];
}
