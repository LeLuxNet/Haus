import { Razer, toRzColor } from "..";
import { State } from "../../../state";
import { Color } from "../../color";
import { RazerDevice } from "../device";

export class RazerMousepad extends RazerDevice {
  global: State<Color>;
  leds: State<Color>[];

  constructor(razer: Razer) {
    super(razer, () =>
      this.razer.api.put("mousepad", {
        effect: "CHROMA_CUSTOM",
        param: this.leds.map((e) => toRzColor(e.last)),
      })
    );

    this.global = new State<Color>(undefined, undefined, async (val) => {
      this.leds.forEach((e) => (e.last = val));
      this.update.scedule();
    });

    this.leds = [];
    for (let i = 0; i < 15; i++) {
      this.leds.push(
        new State<Color>(undefined, undefined, async () =>
          this.update.scedule()
        )
      );
    }
  }
}
