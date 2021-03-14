import { Color } from "./lighting/color";
import { Trigger } from "./trigger";
import { Update } from "./update";

type Get<T> = () => Promise<T>;
type Set<T> = (val: T) => Promise<void>;

export interface StateConstructor<T> {
  initial?: T;

  get?: Get<T>;
  set?: Set<T>;

  autoUpdate?: number;

  update?: Update;
}

export class State<T> extends Trigger<T> {
  last?: T;

  autoUpdate?: number;
  _autoUpdateInterval?: NodeJS.Timeout;

  readonly get?: Get<T>;
  readonly set?: Set<T>;

  constructor({ initial, get, set, autoUpdate, update }: StateConstructor<T>) {
    super();
    this.last = initial;
    this.autoUpdate = autoUpdate;

    if (get !== undefined) {
      this.get = () =>
        get().then((val) => {
          this.update(val);
          return val;
        });
    } else if (update !== undefined) {
      this.get = () => update.fun().then(() => this.last!);
    }

    if (this.get !== undefined) {
      if (this.last === undefined) {
        this.get();
      }

      if (this.subscriptions.length < 0 && this.autoUpdate !== undefined) {
        this._autoUpdateInterval = global.setInterval(
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
    const state = new State<T>({
      set: async (val) => {
        await Promise.all(
          states.map(async (e) => {
            if (e.set !== undefined) {
              await e.set(val);
            }
          })
        );
      },
    });

    return state;
  }

  update(value: T) {
    if (!State.equal(this.last, value)) {
      this.last = value;
      this.trigger(value);
    }
  }

  subscribe(fn: (val: T) => void, anchor: any) {
    if (
      this._autoUpdateInterval === undefined &&
      this.autoUpdate !== undefined &&
      this.get !== undefined
    ) {
      this._autoUpdateInterval = global.setInterval(
        this.get,
        this.autoUpdate * 1000
      );
    }

    const unsub = super.subscribe(fn, anchor);
    return () => {
      unsub();

      if (
        this._autoUpdateInterval !== undefined &&
        this.subscriptions.length === 0
      ) {
        clearInterval(this._autoUpdateInterval);
        this._autoUpdateInterval = undefined;
      }
    };
  }

  static toJSON(data: any) {
    if (data instanceof Color) {
      return data.toJSON();
    }
    return data;
  }

  static equal(a: any, b: any) {
    if (a instanceof Color && b instanceof Color) {
      return a.x === b.x && a.y === b.y && a.z === b.z;
    }
    return a === b;
  }
}
