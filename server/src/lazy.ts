export class Lazy<T> {
  private fn?: () => T;
  private val?: T;

  constructor(fn: () => T) {
    this.fn = fn;
  }

  static val<T>(val: T) {
    return new Lazy<T>(() => val);
  }

  static pval<T>(val: T) {
    return new Lazy<Promise<T>>(() => Promise.resolve(val));
  }

  get() {
    if (this.fn !== undefined) {
      this.val = this.fn();
      this.fn = undefined;
    }
    return this.val as T;
  }
}
