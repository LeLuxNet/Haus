import axios from "axios";
import { NAME, VERSION } from "../../const";
import { Plugin } from "../../plugins";
import { State } from "../../state";
import { Update } from "../../update";
import { Counter } from "../counter";

export default <Plugin>{
  name: "Reddit",
  id: "reddit-post-score",

  create: async ({ id }, pid) => {
    const update = new Update(async () => {
      const res = await axios.get(
        `https://www.reddit.com/comments/${id}.json`,
        {
          headers: {
            "User-Agent": `${NAME}/${VERSION}`,
          },
        }
      );
      const post = res.data[0].data.children[0].data;

      name.update(post.title);
      val.update(post.score);
    });

    const name = new State<string>({ update });
    const val = new State<number>({ update, autoUpdate: 60 });

    return new Counter(pid, name, val);
  },
};
