import { PluginInstance } from "../plugins";
import { State } from "../state";

export class Counter implements PluginInstance {
  name: State<string>;
  val: State<number>;
  avatar?: State<string>;

  constructor(name: State<string>, val: State<number>, avatar?: State<string>) {
    this.name = name;
    this.val = val;
    this.avatar = avatar;
  }

  get fields() {
    return {
      name: this.name,
      val: this.val,
      avatar: this.avatar,
    };
  }
}
