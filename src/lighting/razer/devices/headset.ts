import { Razer, toRzColor } from "..";
import { ColorState } from "../../state";
import { RazerDevice } from "../device";

export class RazerHeadset extends RazerDevice {
  left: ColorState;
  right: ColorState;

  constructor(razer: Razer) {
    super(razer, () =>
      this.razer.api.put("headset", {
        effect: "CHROMA_CUSTOM",
        param: [toRzColor(this.left.last), toRzColor(this.right.last), 0, 0, 0],
      })
    );

    this.left = new ColorState({
      set: async () => {
        this.update.scedule();
      },
    });

    this.right = new ColorState({
      set: async () => {
        this.update.scedule();
      },
    });
  }
}
