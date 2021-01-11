import axios, { AxiosInstance } from "axios";
import { AUTHOR, AUTHOR_LINK, NAME } from "../../const";
import { State } from "../../state";
import { Color } from "../color";
import { Light } from "../light";
import { Lighting } from "../lighting";

export class Razer extends Lighting {
  api: AxiosInstance;
  heartbeat: NodeJS.Timeout;

  mousepad: Mousepad;

  constructor(host: string) {
    super();
    this.api = axios.create({
      baseURL: host,
    });

    this.api.interceptors.request.use((config) => {
      console.log(config.url, config.data);
      return config;
    });

    this.api.interceptors.response.use((res) => {
      console.log(res.data);
      return res;
    });

    this.heartbeat = setInterval(() => {
      this.api.put("heartbeat");
    }, 1000);

    this.mousepad = new Mousepad(this);
  }

  static async create() {
    const res = await axios.post("http://localhost:54235/razer/chromasdk", {
      title: NAME,
      description: " ",
      author: {
        name: AUTHOR,
        contact: AUTHOR_LINK,
      },
      device_supported: [
        "keyboard",
        "mouse",
        "headset",
        "mousepad",
        "keypad",
        "chromalink",
      ],
      category: "application",
    });

    return new Razer(res.data.uri);
  }

  stop() {
    clearInterval(this.heartbeat);
    return this.api.delete("");
  }
}

class Mousepad {
  razer: Razer;

  global: State<Color>;
  leds: State<Color>[];

  logo: State<Color>;
  corner: State<Color>[];

  constructor(razor: Razer) {
    this.razer = razor;

    this.global = new State<Color>(undefined, undefined, (val) => {
      this.leds.forEach((e) => (e.last = val));
      return this.razer.api.put("mousepad", {
        effect: "CHROMA_STATIC",
        param: {
          color: toRzColor(val),
        },
      });
    });

    this.leds = [];
    for (let i = 0; i < 15; i++) {
      this.leds.push(
        new State<Color>(undefined, undefined, () =>
          this.razer.api.put("mousepad", {
            effect: "CHROMA_CUSTOM",
            param: this.leds.map((e) =>
              e.last === undefined ? 0 : toRzColor(e.last)
            ),
          })
        )
      );
    }

    this.logo = this.leds[0];
    this.corner = this.leds.slice(1);
  }
}

function toRzColor(color: Color) {
  const [r, g, b] = color.toRGB();
  return (b << 16) + (g << 8) + r;
}
