import axios from "axios";
import { State } from "../../state";
import { Counter } from "../counter";

export class GitHub extends Counter {
  id: string;

  constructor(id: string, name: string, val: number, avatar: string) {
    super(
      new State(name, undefined, undefined),
      new State(val, undefined, undefined)
    );
    this.avatar = new State(avatar, undefined, undefined);

    this.id = id;

    setInterval(async () => {
      const res = await axios.get(`https://api.github.com/user/${id}`);

      this.name.update(res.data.login);
      this.val.update(res.data.followers);
      this.avatar?.update(res.data.avatar_url);
    }, 1 * 60 * 1000);
  }

  static async create(username: string) {
    const res = await axios.get(`https://api.github.com/users/${username}`);
    return new GitHub(
      res.data.id,
      res.data.login,
      res.data.followers,
      res.data.avatar_url
    );
  }
}
