import { Razer, toRzColor } from "..";
import { State } from "../../../state";
import { Color } from "../../color";
import { ColorState } from "../../state";
import { RazerDevice } from "../device";

export class RazerMousepad extends RazerDevice {
  global: ColorState;
  leds: ColorState[];

  constructor(razer: Razer) {
    super(
      razer,
      () =>
        this.razer.api.put("mousepad", {
          effect: "CHROMA_CUSTOM",
          param: this.leds.map((e) => toRzColor(e.last)),
        }),
      "mousepad"
    );

    this.global = new ColorState({
      set: async (val) => {
        this.leds.forEach((e) => (e.last = val));
        this.update.scedule();
      },
    });

    this.leds = [];
    for (let i = 0; i < 15; i++) {
      this.leds.push(
        new ColorState({ set: async () => this.update.scedule() })
      );
    }
  }
}
