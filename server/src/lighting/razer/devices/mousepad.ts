import { AxiosInstance } from "axios";
import { toRzColor } from "..";
import { Platform } from "../../../platform";
import { Home } from "../../../server/home";
import { ColorState } from "../../state";
import { RazerDevice } from "../device";

export class RazerMousepad extends RazerDevice {
  global: ColorState;
  leds: ColorState[];

  constructor(api: AxiosInstance, platform: Platform, home: Home) {
    super(api, platform, home, "mousepad", () =>
      api.put("mousepad", {
        effect: "CHROMA_CUSTOM",
        param: this.leds.map((e) => toRzColor(e.last)),
      })
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

  get type() {
    return "mousepad";
  }
}
