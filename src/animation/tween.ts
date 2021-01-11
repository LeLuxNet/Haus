import { EventEmitter } from "events";

export class TweenAnimation extends EventEmitter {
  delta: number;

  sleep: number;
  i: number;

  value: number;

  constructor(from: number, to: number, ms: number, tps: number) {
    super();

    this.value = from;

    this.sleep = 1000 / tps;
    this.i = ((ms / 1000) * tps) | 0;

    this.delta = (to - from) / this.i;
  }

  run() {
    this.step();
    if (this.i > 0) {
      setTimeout(() => this.run(), this.sleep);
    } else {
      this.emit("stop");
    }
  }

  step() {
    this.value += this.delta;
    this.i--;
    this.emit("value", this.value);
  }
}
