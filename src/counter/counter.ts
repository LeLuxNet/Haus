import { State } from "../state";

export class Counter {
  name: State<string>;
  val: State<number>;
  avatar?: State<string>;

  constructor(name: State<string>, val: State<number>) {
    this.name = name;
    this.val = val;
  }
}
