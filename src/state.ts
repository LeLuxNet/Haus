import { EventEmitter } from "events";

type Get<T> = () => Promise<T>;
type Set<T> = (val: T) => Promise<void>;

export class State<T> extends EventEmitter {
  last?: T;

  get: Get<T>;
  set?: Set<T>;

  constructor(initial: T | undefined, get: Get<T>, set?: Set<T>) {
    super();
    this.last = initial;

    this.get = () =>
      get().then((val) => {
        this.update(val);
        return val;
      });
    if (this.last === undefined) {
      this.get();
    }

    this.set = set;
  }

  update(value: T) {
    this.last = value;
    this.emit("value", value);
  }

  toString() {
    return `State(${this.last})`;
  }
}
