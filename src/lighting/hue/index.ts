import axios, { AxiosInstance } from "axios";
import { Lighting } from "../lighting";
import { Light } from "../light";
import { State } from "../../state";
import { Sensor } from "../../sensors/sensor";
import { NAME } from "../../const";
import { Color } from "../color";

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
        new State(
          data.state.on,
          () => this.api.get(`lights/${id}/state`).then((res) => res.data.on),
          (val) => this.api.put(`lights/${id}/state`, { on: val })
        ),
        new State(
          Color.fromHSV(
            res.data.hue / hueMult,
            res.data.sat / satMult,
            res.data.bri / briMult
          ),
          () =>
            this.api
              .get(`lights/${id}/state`)
              .then((res) =>
                Color.fromHSV(
                  res.data.hue / hueMult,
                  res.data.sat / satMult,
                  res.data.bri / briMult
                )
              ),
          (val) => {
            const [h, s, v] = val.toHSV();
            return this.api.put(`lights/${id}/state`, {
              hue: Math.round(h * hueMult),
              sat: Math.round(s * satMult),
              bri: Math.round(v * briMult),
            });
          }
        )
      );

      return l;
    });
  }

  async allSensors() {
    const res = await this.api.get("sensors");
    const sensors = Object.entries<any>(res.data);

    return sensors.map(([id, data]) => {
      const s = new Sensor();

      s.lightlevel = this.createSensorState(data.state, id, "lightlevel");
      s.temperature = this.createSensorState(data.state, id, "temperature");
      s.presence = this.createSensorState(data.state, id, "presence");

      return s;
    });
  }

  private createSensorState<T>(state: any, id: string, name: string) {
    if (state[name] === undefined) {
      return undefined;
    }
    return new State<T>(
      state[name],
      () => this.api.get(`sensors/${id}/state`).then((res) => res.data[name]),
      undefined
    );
  }

  async devices() {
    return [...(await this.allLights()), ...(await this.allSensors())];
  }
}
