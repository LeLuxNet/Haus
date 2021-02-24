import axios from "axios";
import { State } from "../../state";
import { Counter } from "../counter";

const csrf =
  "uxS9HTwYJHKtnDwZXKXXiZSDhMtxKX7di1Ew3O1d9Bhi2EQtp/Wt6OBQL3UJWA25INVWf9Y4d5OeBYrYmQNqVQ==";
const session =
  "N0dqeXJyNHFsM2h6UnFjRThqY0M3a0o1ZmNvQW5SOEFaN3dweGxJY09nRURMNkEyMSs1NEFhZzFadlFWWjhRZ3ZzVXVPTzlyUW9pK1ZRY3pzLzBTUERmZ1FXdlk4V0UwWU1yYmsrMnlqSSt1WnhPNEZ2OUpCUkxwTjdCK2ZhZXhxTjRCOTlXVFZwNUVsSzVVNVBDMUZRPT0tLTB5VG5mbjJqbytpUWFCandhdmJ5U1E9PQ%3D%3D--94da81424fe74e9df79e8f17129489f5a45415fc";

export class Kickstarter extends Counter {
  constructor(owner: string, project: string) {
    super(
      new State({}),
      new State({
        get: () =>
          axios
            .post(
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
            )
            .then((res) => {
              this.name.update(res.data.data.project.name);
              return parseInt(res.data.data.project.pledged.amount);
            }),
        autoUpdate: 1 * 60,
      })
    );
  }
}
