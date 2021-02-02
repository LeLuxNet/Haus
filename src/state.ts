import { EventEmitter } from "events";
import { Trigger } from "./trigger";

type Get<T> = () => Promise<T>;
type Set<T> = (val: T) => Promise<void>;

export class State<T> extends Trigger<T> {
  last?: T;

  autoUpdate?: number;
  _autoUpdateInterval?: NodeJS.Timeout;

  readonly get?: Get<T>;
  set?: Set<T>;

  constructor(
    initial: T | undefined,
    get: Get<T> | undefined,
    set: Set<T> | undefined,
    { autoUpdate }: { autoUpdate?: number } = {}
  ) {
    super();
    this.last = initial;
    this.autoUpdate = autoUpdate;

    if (get !== undefined) {
      this.get = () =>
        get().then((val) => {
          this.update(val);
          return val;
        });

      if (this.last === undefined) {
        this.get();
      }

      if (this.subscribers.length < 0 && this.autoUpdate !== undefined) {
        this._autoUpdateInterval = setInterval(
          this.get,
          this.autoUpdate * 1000
        );
      }
    }

    if (set !== undefined) {
      this.set = (val) => {
        this.update(val);
        return set(val);
      };
    }
  }

  static link<T>(...states: State<T>[]) {
    const state = new State<T>(undefined, undefined, async (val) => {
      await Promise.all(
        states.map(async (e) => {
          if (e.set !== undefined) {
            await e.set(val);
          }
        })
      );
    });

    return state;
  }

  update(value: T) {
    if (this.last !== value) {
      this.last = value;
      this.trigger(value);
    }
  }

  subscribe(fn: (val: T) => void) {
    if (
      this._autoUpdateInterval === undefined &&
      this.autoUpdate !== undefined &&
      this.get !== undefined
    ) {
      this._autoUpdateInterval = setInterval(this.get, this.autoUpdate * 1000);
    }

    super.subscribe(fn);
  }

  unsubscripe(fn: (val: T) => void) {
    super.unsubscribe(fn);

    if (
      this._autoUpdateInterval !== undefined &&
      this.subscribers.length === 0
    ) {
      clearInterval(this._autoUpdateInterval);
      this._autoUpdateInterval = undefined;
    }
  }
}
