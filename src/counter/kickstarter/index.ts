import axios from "axios";
import { Plugin } from "../../plugins";
import { State } from "../../state";
import { Update } from "../../update";
import { Counter } from "../counter";

const csrf =
  "uxS9HTwYJHKtnDwZXKXXiZSDhMtxKX7di1Ew3O1d9Bhi2EQtp/Wt6OBQL3UJWA25INVWf9Y4d5OeBYrYmQNqVQ==";
const session =
  "N0dqeXJyNHFsM2h6UnFjRThqY0M3a0o1ZmNvQW5SOEFaN3dweGxJY09nRURMNkEyMSs1NEFhZzFadlFWWjhRZ3ZzVXVPTzlyUW9pK1ZRY3pzLzBTUERmZ1FXdlk4V0UwWU1yYmsrMnlqSSt1WnhPNEZ2OUpCUkxwTjdCK2ZhZXhxTjRCOTlXVFZwNUVsSzVVNVBDMUZRPT0tLTB5VG5mbjJqbytpUWFCandhdmJ5U1E9PQ%3D%3D--94da81424fe74e9df79e8f17129489f5a45415fc";

export default <Plugin>{
  name: "Kickstarter",
  id: "kickstarter",

  create: async ({ owner, project }, id) => {
    const update = new Update(async () => {
      const res = await axios.post(
        "https://www.kickstarter.com/graph",
        {
          query:
            "query($slug: String!) { project(slug: $slug) { pid name pledged { amount }}}",
          variables: {
            slug: `${owner}/${project}`,
          },
        },
        {
          headers: {
            "x-csrf-token": csrf,
            cookie: `_ksr_session=${session};`,
          },
        }
      );

      name.update(res.data.data.project.name);
      val.update(parseInt(res.data.data.project.pledged.amount));
    });

    const name = new State<string>({ update });
    const val = new State<number>({ update, autoUpdate: 60 });

    return new Counter(id, name, val);
  },
};
