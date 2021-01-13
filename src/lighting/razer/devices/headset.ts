import { Razer, toRzColor } from "..";
import { State } from "../../../state";
import { Color } from "../../color";
import { RazerDevice } from "../device";

export class RazerHeadset extends RazerDevice {
  left: State<Color>;
  right: State<Color>;

  constructor(razer: Razer) {
    super(razer, () =>
      this.razer.api.put("headset", {
        effect: "CHROMA_CUSTOM",
        param: [toRzColor(this.left.last), toRzColor(this.right.last), 0, 0, 0],
      })
    );

    this.left = new State<Color>(undefined, undefined, async () => {
      this.update.scedule();
    });

    this.right = new State<Color>(undefined, undefined, async () => {
      this.update.scedule();
    });
  }
}
