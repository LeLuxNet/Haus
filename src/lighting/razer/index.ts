import axios, { AxiosInstance } from "axios";
import { AUTHOR, AUTHOR_LINK, NAME } from "../../const";
import { Home } from "../../server/home";
import { Color } from "../color";
import { Lighting } from "../lighting";
import { RazerHeadset } from "./devices/headset";
import { RazerKeyboard } from "./devices/keyboard";
import { RazerKeypad } from "./devices/keypad";
import { RazerMouse } from "./devices/mouse";
import { RazerMousepad } from "./devices/mousepad";
import { RazerError } from "./error";

export class Razer extends Lighting {
  api: AxiosInstance;
  heartbeat: NodeJS.Timeout;

  headset: RazerHeadset;
  keyboard: RazerKeyboard;
  keypad: RazerKeypad;
  mousepad: RazerMousepad;
  mouse: RazerMouse;

  constructor(host: string, id: string, home: Home) {
    super(id, home);
    this.api = axios.create({
      baseURL: host,
    });

    this.api.interceptors.response.use((res) => {
      if (res.data.result) {
        throw new RazerError(res.data.result, res.data.error);
      }
      return res;
    });

    this.heartbeat = setInterval(() => {
      this.api.put("heartbeat");
    }, 1000);

    this.headset = new RazerHeadset(this);
    this.keyboard = new RazerKeyboard(this);
    this.keypad = new RazerKeypad(this);
    this.mousepad = new RazerMousepad(this);
    this.mouse = new RazerMouse(this);
  }

  async devices() {
    return [
      this.headset,
      this.keyboard,
      this.keypad,
      this.mousepad,
      this.mouse,
    ];
  }

  async stop() {
    clearInterval(this.heartbeat);
    await this.api.delete("");
  }
}

export function toRzColor(color?: Color) {
  if (color === undefined) return 0;

  const [r, g, b] = color.toRGB();
  return (b << 16) + (g << 8) + r;
}

export async function create({}, id: string, home: Home) {
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

  return new Razer(res.data.uri, id, home);
}
