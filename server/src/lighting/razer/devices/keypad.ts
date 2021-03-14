import { AxiosInstance } from "axios";
import { toRzColor } from "..";
import { Platform } from "../../../platform";
import { Home } from "../../../server/home";
import { ColorState } from "../../state";
import { RazerDevice } from "../device";

export class RazerKeypad extends RazerDevice {
  keys: ColorState[][];

  constructor(api: AxiosInstance, platform: Platform, home: Home) {
    super(api, platform, home, "keypad", () =>
      api.put("keypad", {
        effect: "CHROMA_CUSTOM",
        param: this.keys.map((a) => a.map((b) => toRzColor(b.last))),
      })
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

  get type() {
    return "keypad";
  }
}
