export class Update {
  scheduled: boolean = false;
  fun: () => Promise<void>;

  constructor(fun: () => Promise<void>) {
    this.fun = fun;
  }

  scedule() {
    if (!this.scheduled) {
      this.scheduled = true;
      process.nextTick(() => {
        this.scheduled = false;
        return this.fun();
      });
    }
  }
}
