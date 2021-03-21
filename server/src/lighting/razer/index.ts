import axios from "axios";
import { AUTHOR, AUTHOR_LINK, NAME } from "../../const";
import { Platform } from "../../platform";
import { Plugin } from "../../plugins";
import { Color } from "../color";
import { RazerHeadset } from "./devices/headset";
import { RazerKeyboard } from "./devices/keyboard";
import { RazerKeypad } from "./devices/keypad";
import { RazerMouse } from "./devices/mouse";
import { RazerMousepad } from "./devices/mousepad";
import { RazerError } from "./error";

export function toRzColor(color?: Color) {
  if (color === undefined) return 0;

  const [r, g, b] = color.toRGB();
  return (b << 16) + (g << 8) + r;
}

export default <Plugin>{
  name: "Razer",

  create: async ({}, id, home, logger) => {
    const res = await axios.post("http://localhost:54235/razer/chromasdk", {
      title: NAME,
      description: " ",
      author: {
        name: AUTHOR,
        contact: AUTHOR_LINK,
      },
      device_supported: ["headset", "keyboard", "keypad", "mouse", "mousepad"],
      category: "application",
    });

    const api = axios.create({
      baseURL: res.data.uri,
    });

    api.interceptors.response.use((res) => {
      if (res.data.result) {
        throw new RazerError(res.data.result, res.data.error);
      }
      return res;
    });

    const heartbeat = global.setInterval(() => api.put("heartbeat"), 1000);

    const instance = new Platform(id, home, logger, async (platform) => [
      new RazerHeadset(api, platform, home),
      new RazerKeyboard(api, platform, home),
      new RazerKeypad(api, platform, home),
      new RazerMousepad(api, platform, home),
      new RazerMouse(api, platform, home),
    ]);

    instance.stop = () => {
      clearInterval(heartbeat);
      return api.delete("");
    };

    return instance;
  },
};
