import axios from "axios";
import { Plugin } from "../../plugins";
import { State } from "../../state";
import { Update } from "../../update";
import { Counter } from "../counter";

// https://api.github.com/user/{id}
// https://api.github.com/users/{username}

export default <Plugin>{
  name: "GitHub",
  id: "github-followers",

  create: async ({ username }, id) => {
    const update = new Update(async () => {
      const res = await axios.get(`https://api.github.com/users/${username}`);

      name.update(res.data.login);
      val.update(res.data.followers);
      avatar.update(res.data.avatar_url);
    });

    const name = new State<string>({ update, autoUpdate: 60 });
    const val = new State<number>({ update });
    const avatar = new State<string>({ update });

    return new Counter(id, name, val, avatar);
  },
};
