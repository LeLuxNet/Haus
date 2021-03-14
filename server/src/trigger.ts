export class Trigger<T> {
  _subscriptions: Map<any, ((val: T) => void)[]> = new Map();

  get subscriptions() {
    return Array.from(this._subscriptions.values()).flat();
  }

  trigger(val: T) {
    this.subscriptions.forEach((s) => s(val));
  }

  subscribe(fn: (val: T) => void, anchor: any) {
    var arr = this._subscriptions.get(anchor);
    if (arr === undefined) {
      arr = [];
      this._subscriptions.set(anchor, arr);
    }

    arr.push(fn);

    return () => {
      const arr = this._subscriptions.get(anchor);
      if (arr !== undefined) {
        const i = arr.indexOf(fn);
        if (i !== -1) {
          arr.splice(i, 1);
        }

        if (arr.length === 0) {
          this._subscriptions.delete(anchor);
        }
      }
    };
  }

  disconnectAnchor(anchor: any) {
    this._subscriptions.delete(anchor);
  }
}
