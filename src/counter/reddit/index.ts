import axios from "axios";
import { NAME, VERSION } from "../../const";
import { State } from "../../state";
import { Update } from "../../update";
import { Counter } from "../counter";

export class Reddit extends Counter {
  constructor(id: string) {
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

      this.name.update(post.title);
      this.val.update(post.score);
    });

    super(new State({ update }), new State({ update, autoUpdate: 60 }));
  }
}
