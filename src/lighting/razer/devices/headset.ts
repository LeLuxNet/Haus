import { AxiosInstance } from "axios";
import { toRzColor } from "..";
import { Platform } from "../../../platform";
import { Home } from "../../../server/home";
import { ColorState } from "../../state";
import { RazerDevice } from "../device";

export class RazerHeadset extends RazerDevice {
  left: ColorState;
  right: ColorState;

  constructor(api: AxiosInstance, platform: Platform, home: Home) {
    super(api, platform, home, "headset", () =>
      this.api.put("headset", {
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

  get type() {
    return "headset";
  }
}
