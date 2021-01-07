import { EventEmitter } from "events";

export class State<T> extends EventEmitter {
  last?: T;

  get: () => Promise<T>;
  set?: (val: T) => Promise<void>;

  constructor(
    initial: T | undefined,
    get: () => Promise<T>,
    set?: (val: T) => Promise<void>
  ) {
    super();
    this.last = initial;

    this.get = get;
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
