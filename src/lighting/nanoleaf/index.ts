import axios, { AxiosError, AxiosInstance } from "axios";
import { config } from "process";
import { strategy } from "sharp";
import { Logger } from "../../logger";
import { Home } from "../../server/home";
import { State } from "../../state";
import { Color } from "../color";
import { Light } from "../light";
import { Lighting } from "../lighting";
import { ColorState } from "../state";

const briMult = 100 / 255;
const satMult = 100 / 255;

const sizeMult = 0.24;

// https://forum.nanoleaf.me/docs
class Nanoleaf extends Lighting {
  api: AxiosInstance;

  global: Light;

  constructor(
    host: string,
    key: string,
    id: string,
    home: Home,
    logger: Logger
  ) {
    super(id, home, logger);
    this.api = axios.create({
      baseURL: `${host}/api/v1/${key}`,
    });

    this.global = new Light(
      this.home.getDeviceId(this),
      this,
      new State({
        get: () => this.api.get(`state/on`).then((res) => res.data.value),
        set: (val) => this.api.put("state", { on: { value: val } }),
      }),

      new ColorState({
        get: () =>
          this.api
            .get(`state`)
            .then((res) =>
              Color.fromHSV(
                res.data.hue.value,
                res.data.brightness / briMult,
                res.data.sat / satMult
              )
            ),
        set: (val) => {
          const [h, s, v] = val.toHSV();
          return this.api.put("state", {
            hue: { value: h },
            sat: { value: Math.round(s * satMult) },
            brightness: { value: Math.round(v * briMult) },
          });
        },
        fadeEffect: (from, to, t) => {
          const palette = [from];
          const keyframes = Math.ceil(t / 60);

          for (let i = 1; i <= keyframes; i++) {
            palette[i] = Color.mix(from, to, i / keyframes);
          }

          this.api.put("effects", {
            write: {
              command: "display",
              version: "1.0",
              animType: "fade",
              colorType: "HSB",

              transTime: Math.round((t * 10) / keyframes),
              loop: false,
              delayTime: 0,

              palette: palette.map((c) => {
                const [h, s, b] = c.toHSV();
                return {
                  hue: h,
                  saturation: s * satMult,
                  brightness: b * briMult,
                };
              }),
            },
          });
        },
      })
    );
  }

  async devices() {
    return [this.global];
  }
}

export async function create(
  { host, key }: { host: string; key?: string },
  id: string,
  home: Home,
  logger: Logger
) {
  if (key === undefined) {
    const res = await axios.post(`${host}/api/v1/new`);
    key = res.data.auth_token as string;
  }

  return new Nanoleaf(host, key, id, home, logger);
}
