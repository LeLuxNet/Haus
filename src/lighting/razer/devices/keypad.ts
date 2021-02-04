import { Razer, toRzColor } from "..";
import { State } from "../../../state";
import { Color } from "../../color";
import { ColorState } from "../../state";
import { RazerDevice } from "../device";

export class RazerKeypad extends RazerDevice {
  keys: ColorState[][];

  constructor(razer: Razer) {
    super(
      razer,
      () =>
        this.razer.api.put("keypad", {
          effect: "CHROMA_CUSTOM",
          param: this.keys.map((a) => a.map((b) => toRzColor(b.last))),
        }),
      "keypad"
    );

    this.keys = [];
    for (let i = 0; i < 4; i++) {
      const row = [];
      for (let j = 0; j < 5; j++) {
        row.push(
          new ColorState({
            set: async () => {
              this.update.scedule();
            },
          })
        );
      }
      this.keys.push(row);
    }
  }
}
