export class Trigger<T> {
  subscribers: ((val: T) => void)[] = [];

  trigger(val: T) {
    this.subscribers.forEach((s) => s(val));
  }

  subscribe(fn: (val: T) => void) {
    this.subscribers.push(fn);
  }

  unsubscribe(fn: (val: T) => void) {
    const index = this.subscribers.indexOf(fn);
    if (index > -1) {
      this.subscribers.splice(index, 1);
    }
  }
}
