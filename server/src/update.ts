export class Update {
  scheduled: boolean = false;
  fun: () => Promise<void>;

  constructor(fun: () => Promise<void>) {
    this.fun = fun;
  }

  scedule() {
    return new Promise<void>((resolve, reject) => {
      if (!this.scheduled) {
        this.scheduled = true;
        process.nextTick(() => {
          this.scheduled = false;
          this.fun().then(resolve).catch(reject);
        });
      }
    });
  }
}
