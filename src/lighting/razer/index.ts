import axios, { AxiosInstance } from "axios";
import { AUTHOR, AUTHOR_LINK, NAME } from "../../const";
import { State } from "../../state";
import { Color } from "../color";
import { Light } from "../light";
import { Lighting } from "../lighting";

interface RazerOptions {
  mousepad?: "v1" | "v2";
  mouse?: true;
}

export class Razer extends Lighting {
  api: AxiosInstance;
  heartbeat: NodeJS.Timeout;

  mousepad?: RazerMousepad;
  mouse?: RazerMouse;

  constructor(host: string, options: RazerOptions = {}) {
    super();
    this.api = axios.create({
      baseURL: host,
    });

    /* this.api.interceptors.request.use((config) => {
      console.log(config.url, config.data);
      return config;
    });

    this.api.interceptors.response.use((res) => {
      console.log(res.data);
      return res;
    }); */

    this.heartbeat = setInterval(() => {
      this.api.put("heartbeat");
    }, 1000);

    if (options.mousepad !== undefined) {
      this.mousepad = new RazerMousepad(
        this,
        options.mousepad === "v1" ? 15 : 20
      );
    }

    if (options.mouse !== undefined) {
      this.mouse = new RazerMouse(this);
    }
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

class RazerMousepad {
  razer: Razer;

  global: State<Color>;
  leds: State<Color>[];

  updateScheduled: boolean = false;

  constructor(razor: Razer, leds: number) {
    this.razer = razor;

    this.global = new State<Color>(undefined, undefined, async (val) => {
      this.leds.forEach((e) => (e.last = val));
      this.scheduleUpdate();
    });

    this.leds = [];
    for (let i = 0; i < leds; i++) {
      this.leds.push(
        new State<Color>(undefined, undefined, async () =>
          this.scheduleUpdate()
        )
      );
    }
  }

  private scheduleUpdate() {
    if (!this.updateScheduled) {
      this.updateScheduled = true;
      process.nextTick(() => {
        this.updateScheduled = false;
        this.razer.api.put("mousepad", {
          effect: "CHROMA_CUSTOM",
          param: this.leds.map((e) =>
            e.last === undefined ? 0 : toRzColor(e.last)
          ),
        });
      });
    }
  }
}

class RazerMouse {
  razer: Razer;

  global: State<Color>;

  updateScheduled: boolean = false;

  constructor(razor: Razer) {
    this.razer = razor;

    this.global = new State<Color>(undefined, undefined, (val) =>
      this.razer.api.put("mouse", {
        effect: "CHROMA_STATIC",
        param: {
          color: toRzColor(val),
        },
      })
    );
  }
}

function toRzColor(color: Color) {
  const [r, g, b] = color.toRGB();
  return (b << 16) + (g << 8) + r;
}
