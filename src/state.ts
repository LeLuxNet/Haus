import { EventEmitter } from "events";

type Get<T> = () => Promise<T>;
type Set<T> = (val: T) => Promise<void>;

export class State<T> extends EventEmitter {
  last?: T;

  get?: Get<T>;
  set?: Set<T>;

  constructor(
    initial: T | undefined,
    get: Get<T> | undefined,
    set: Set<T> | undefined
  ) {
    super();
    this.last = initial;

    if (get !== undefined) {
      this.get = () =>
        get().then((val) => {
          this.update(val);
          return val;
        });

      if (this.last === undefined) {
        this.get();
      }
    }

    if (set !== undefined) {
      this.set = (val) => {
        this.update(val);
        return set(val);
      };
    }
  }

  update(value: T) {
    this.last = value;
    this.emit("value", value);
  }

  toString() {
    return `State(${this.last})`;
  }
}
