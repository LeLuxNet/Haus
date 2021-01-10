import axios, { AxiosInstance } from "axios";
import { Lighting } from "../lighting";
import { Light } from "../light";
import { State } from "../../state";
import { Sensor } from "../../sensors/sensor";
import { NAME } from "../../const";

const hueMult = 65535 / 360;
const briMult = 254 / 255;
const satMult = 254 / 255;

export class PhilipsHue extends Lighting {
  api: AxiosInstance;

  constructor(host: string, key: string) {
    super();
    this.api = axios.create({
      baseURL: `${host}/api/${key}`,
    });
  }

  static async link(host: string) {
    const res = await axios.post(`${host}/api`, {
      devicetype: NAME.toLowerCase(),
    });
    const data = res.data[0];

    if (data.error !== undefined) {
      if (data.error.type === 101) {
        return undefined;
      } else {
        throw data.error.description;
      }
    } else {
      return new PhilipsHue(host, data.success.username);
    }
  }

  async allLights() {
    const res = await this.api.get("lights");
    const lights = Object.entries<any>(res.data);

    return lights.map(([id, data]) => {
      const l = new Light(
        this.createState<boolean>(data.state, id, "on", "lights")!
      );

      l.bri = this.createState(
        data.state,
        id,
        "bri",
        "lights",
        (v) => v / briMult,
        (v) => Math.round(v * briMult)
      );

      l.hue = this.createState(
        data.state,
        id,
        "hue",
        "lights",
        (v) => v / hueMult,
        (v) => Math.round(v * hueMult)
      );

      l.sat = this.createState(
        data.state,
        id,
        "sat",
        "lights",
        (v) => v / satMult,
        (v) => Math.round(v * satMult)
      );

      l.ct = this.createState(data.state, id, "ct", "lights");

      return l;
    });
  }

  async allSensors() {
    const res = await this.api.get("sensors");
    const sensors = Object.entries<any>(res.data);

    return sensors.map(([id, data]) => {
      const s = new Sensor();

      s.lightlevel = this.createState(data.state, id, "lightlevel", "sensors");
      s.temperature = this.createState(
        data.state,
        id,
        "temperature",
        "sensors"
      );
      s.presence = this.createState(data.state, id, "presence", "sensors");

      return s;
    });
  }

  private createState<T>(
    state: any,
    id: string,
    name: string,
    type: "lights" | "sensors",
    mapGet: (val: T) => T = (v) => v,
    mapSet: (val: T) => T = (v) => v
  ) {
    if (state[name] === undefined) {
      return undefined;
    }
    return new State<T>(
      mapGet(state[name]),
      () =>
        this.api
          .get(`${type}/${id}/state`)
          .then((res) => mapGet(res.data[name])),
      type === "sensors"
        ? undefined
        : (val) => this.api.put(`${type}/${id}/state`, { [name]: mapSet(val) })
    );
  }
}
