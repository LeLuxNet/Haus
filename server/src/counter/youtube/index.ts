import axios from "axios";
import { Plugin } from "../../plugins";
import { State } from "../../state";
import { Update } from "../../update";
import { Counter } from "../counter";

export default <Plugin>{
  name: "YouTube",

  create: async ({ id, key }, pid) => {
    const update = new Update(() =>
      request(id, key, "snippet").then((d) => {
        name.update(d.title);
        avatar.update(d.thumbnails.high.url);
      })
    );

    const name = new State<string>({ update });
    const val = new State<number>({
      get: () => request(id, key, "statistics").then((d) => d.subscriberCount),
      autoUpdate: 60,
    });
    const avatar = new State<string>({ update });

    return new Counter(pid, name, val, avatar);
  },
};

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
