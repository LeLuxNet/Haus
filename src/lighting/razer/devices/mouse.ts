import { Razer, toRzColor } from "..";
import { State } from "../../../state";
import { Color } from "../../color";
import { ColorState } from "../../state";
import { RazerDevice } from "../device";

export class RazerMouse extends RazerDevice {
  scrollWheel: ColorState;
  numpad: ColorState;
  logo: ColorState;

  left: ColorState[];
  right: ColorState[];

  bottom: ColorState[];

  constructor(razer: Razer) {
    super(
      razer,
      () =>
        this.razer.api.put("mouse", {
          effect: "CHROMA_CUSTOM2",
          param: [
            [0, 0, 0, 0, 0, 0, 0],
            [
              toRzColor(this.left[0].last),
              0,
              0,
              0,
              0,
              0,
              toRzColor(this.right[0].last),
            ],
            [
              toRzColor(this.left[1].last),
              0,
              0,
              toRzColor(this.scrollWheel.last),
              0,
              0,
              toRzColor(this.right[1].last),
            ],
            [
              toRzColor(this.left[2].last),
              0,
              0,
              0,
              0,
              0,
              toRzColor(this.right[2].last),
            ],
            [
              toRzColor(this.left[3].last),
              0,
              0,
              0,
              0,
              0,
              toRzColor(this.right[3].last),
            ],
            [
              toRzColor(this.left[4].last),
              0,
              0,
              0,
              0,
              0,
              toRzColor(this.right[4].last),
            ],
            [
              toRzColor(this.left[5].last),
              0,
              0,
              0,
              0,
              0,
              toRzColor(this.right[5].last),
            ],
            [
              toRzColor(this.left[6].last),
              0,
              0,
              toRzColor(this.logo.last),
              0,
              0,
              toRzColor(this.right[6].last),
            ],
            [0, ...this.bottom.map((e) => toRzColor(e.last)), 0],
          ],
        }),
      "mouse"
    );

    this.scrollWheel = new ColorState({
      set: async () => this.update.scedule(),
    });

    this.numpad = new ColorState({ set: async () => this.update.scedule() });

    this.logo = new ColorState({ set: async () => this.update.scedule() });

    this.left = [];
    this.right = [];
    for (let i = 0; i < 7; i++) {
      this.left.push(
        new ColorState({ set: async () => this.update.scedule() })
      );
      this.right.push(
        new ColorState({ set: async () => this.update.scedule() })
      );
    }

    this.bottom = [];
    for (let i = 0; i < 5; i++) {
      this.bottom.push(
        new ColorState({ set: async () => this.update.scedule() })
      );
    }
  }

  get type() {
    return "mouse";
  }
}
