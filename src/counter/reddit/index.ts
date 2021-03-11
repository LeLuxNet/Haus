import axios from "axios";
import { NAME, VERSION } from "../../const";
import { State } from "../../state";
import { Update } from "../../update";
import { Counter } from "../counter";

export class Reddit extends Counter {
  constructor(id: string) {
    // https://github.com/microsoft/TypeScript/issues/42667
    const update = new Update(async function () {
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

    super(name, val);
  }
}
