import axios from "axios";
import { NAME, VERSION } from "../../const";
import { State } from "../../state";
import { Counter } from "../counter";

export class Reddit extends Counter {
  id: string;

  constructor(id: string) {
    const name = new State<string>({});

    super(
      name,
      new State({
        // https://github.com/microsoft/TypeScript/issues/42667
        get: async function () {
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
          return post.score;
        },
        autoUpdate: 60,
      })
    );

    this.id = id;
  }
}
