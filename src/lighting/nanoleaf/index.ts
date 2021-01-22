import axios, { AxiosError, AxiosInstance } from "axios";
import { config } from "process";
import { State } from "../../state";
import { Color } from "../color";
import { Light } from "../light";
import { Lighting } from "../lighting";

const briMult = 100 / 255;
const satMult = 100 / 255;

export class Nanoleaf extends Lighting {
  api: AxiosInstance;

  global: Light;

  constructor(host: string, key: string, id: string) {
    super(id);
    this.api = axios.create({
      baseURL: `${host}/api/v1/${key}`,
    });

    this.global = new Light(
      this,
      new State(
        undefined,
        () => this.api.get(`state/on`).then((res) => res.data.value),
        (val) => this.api.put("state", { on: { value: val } })
      ),

      new State<Color>(
        undefined,
        () =>
          this.api
            .get(`state`)
            .then((res) =>
              Color.fromHSV(
                res.data.hue.value,
                res.data.brightness / briMult,
                res.data.sat / satMult
              )
            ),
        (val) => {
          const [h, s, v] = val.toHSV();
          return this.api.put("state", {
            hue: { value: h },
            sat: { value: Math.round(s * satMult) },
            brightness: { value: Math.round(v * briMult) },
          });
        }
      )
    );
  }

  static async link(host: string, id: string) {
    const res = await axios.post(`${host}/api/v1/new`);

    return new Nanoleaf(host, res.data.auth_token, id);
  }

  async devices() {
    return [this.global];
  }
}
