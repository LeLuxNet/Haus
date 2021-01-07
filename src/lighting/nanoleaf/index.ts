import axios, { AxiosInstance } from "axios";
import { State } from "../../state";
import { Light } from "../light";
import { Lighting } from "../lighting";

class Nanoleaf extends Lighting {
  api: AxiosInstance;

  global: Light;

  constructor(host: string, key: string) {
    super();
    this.api = axios.create({
      baseURL: `${host}/api/v1/${key}`,
    });

    this.global = new Light(this.createState("on"));
    this.global.bri = this.createState("brightness");
    this.global.hue = this.createState("hue");
    this.global.sat = this.createState("sat");
    this.global.ct = this.createState("ct");
  }

  static async link(host: string) {
    const res = await axios.post(`${host}/api/v1/new`);

    return new Nanoleaf(host, res.data.auth_token);
  }

  private createState<T>(name: string) {
    return new State<T>(
      undefined,
      () => this.api.get(`state/${name}`).then((res) => res.data.value),
      (val) => this.api.put("state", { [name]: { value: val } })
    );
  }
}
