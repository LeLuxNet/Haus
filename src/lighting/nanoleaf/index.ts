import axios, { AxiosError, AxiosInstance } from "axios";
import { config } from "process";
import { State } from "../../state";
import { Light } from "../light";
import { Lighting } from "../lighting";

const briMult = 100 / 255;
const satMult = 100 / 255;

export class Nanoleaf extends Lighting {
  api: AxiosInstance;

  global: Light;

  constructor(host: string, key: string) {
    super();
    this.api = axios.create({
      baseURL: `${host}/api/v1/${key}`,
    });

    this.global = new Light(this.createState("on"));
    this.global.bri = this.createState(
      "brightness",
      (v) => v / briMult,
      (v) => Math.round(v * briMult)
    );
    this.global.hue = this.createState("hue");
    this.global.sat = this.createState(
      "sat",
      (v) => v / satMult,
      (v) => Math.round(v * satMult)
    );
    this.global.ct = this.createState("ct");
  }

  static async link(host: string) {
    const res = await axios.post(`${host}/api/v1/new`);

    return new Nanoleaf(host, res.data.auth_token);
  }

  private createState<T>(
    name: string,
    mapGet: (val: T) => T = (v) => v,
    mapSet: (val: T) => T = (v) => v
  ) {
    return new State<T>(
      undefined,
      () => this.api.get(`state/${name}`).then((res) => mapGet(res.data.value)),
      (val) => this.api.put("state", { [name]: { value: mapSet(val) } })
    );
  }
}
