import { State, StateConstructor } from "../state";
import { Color } from "./color";

interface ColorStateCon extends StateConstructor<Color> {
  fadeEffect?: (from: Color, to: Color, t: number) => void;
}

export class ColorState extends State<Color> {
  constructor(data: ColorStateCon) {
    super(data);

    if (data.fadeEffect !== undefined) {
      this.fadeEffect = data.fadeEffect;
    }
  }

  fadeEffect(from: Color, to: Color, t: number) {
    const ups = 5; // 5 updates per second

    const step = 1 / ups / t;
    var i = 0;

    const interval = setInterval(() => {
      if (this.set !== undefined) {
        this.set(Color.mix(from, to, i));
      }

      if (i > 1) {
        clearInterval(interval);
      }
      i += step;
    }, 1000 / ups);
  }
}
