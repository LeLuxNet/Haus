import axios, { AxiosInstance } from "axios";
import { Lighting } from "../lighting";
import { Light } from "../light";
import { State } from "../../state";
import { Sensor } from "../../sensors/sensor";
import { NAME, UPDATE_PRESENCE, UPDATE_SENSOR } from "../../const";
import { Color } from "../color";
import { HueButton } from "./button";
import { ColorState } from "../state";
import { Home } from "../../server/home";

const hueMult = 65535 / 360;
const briMult = 254 / 255;
const satMult = 254 / 255;

export class PhilipsHue extends Lighting {
  api: AxiosInstance;

  constructor(host: string, key: string, id: string, home: Home) {
    super(id, home);
    this.api = axios.create({
      baseURL: `${host}/api/${key}`,
    });
  }

  static async link(host: string, id: string, home: Home) {
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
      return new PhilipsHue(host, data.success.username, id, home);
    }
  }

  static async discover(stealth: boolean = false) {
    const ips: string[] = [];

    if (!stealth) {
      const res = await axios.get("https://discovery.meethue.com");
      res.data.forEach((e: any) => ips.push(e.internalipaddress));
    }

    return ips;
  }

  async allLights() {
    const res = await this.api.get("lights");
    const lights = Object.entries<any>(res.data);

    return lights.map(([id, data]) => {
      const l: Light = new Light(
        this.home.getDeviceId(this, data.uniqueid),
        this,
        new State({
          initial: data.state.on,
          get: () =>
            this.api.get(`lights/${id}/state`).then((res) => res.data.on),
          set: (val) => this.api.put(`lights/${id}/state`, { on: val }),
        }),
        new ColorState({
          initial: Color.fromHSV(
            res.data.hue / hueMult,
            res.data.sat / satMult,
            res.data.bri / briMult
          ),
          get: () =>
            this.api
              .get(`lights/${id}/state`)
              .then((res) =>
                Color.fromHSV(
                  res.data.hue / hueMult,
                  res.data.sat / satMult,
                  res.data.bri / briMult
                )
              ),
          set: (val) => {
            const [h, s, v] = val.toHSV();
            return this.api.put(`lights/${id}/state`, {
              hue: Math.round(h * hueMult),
              sat: Math.round(s * satMult),
              bri: Math.round(v * briMult),
            });
          },
        })
      );

      l.name = data.name;

      return l;
    });
  }

  async allSensors() {
    const res = await this.api.get("sensors");

    const sensors: Map<string, Sensor> = new Map();
    for (const [id, data] of Object.entries<any>(res.data)) {
      if (
        data.state.lightlevel === undefined &&
        data.state.temperature === undefined &&
        data.state.presence === undefined &&
        data.state.buttonevent === undefined
      ) {
        continue;
      }

      const uid = data.uniqueid.split("-")[0];
      const s: Sensor =
        sensors.get(uid) || new Sensor(this.home.getDeviceId(this, uid), this);

      if (!data.name.startsWith(data.productname)) {
        s.name = data.name;
      }

      if (data.state.lightlevel !== undefined) {
        s.lightlevel = new State({
          initial: data.state.lightlevel,
          get: () =>
            this.api
              .get(`sensors/${id}`)
              .then((res) => res.data.state.lightlevel),
          autoUpdate: UPDATE_SENSOR,
        });
      }

      if (data.state.temperature !== undefined) {
        s.temperature = new State<number>({
          initial: data.state.temperature / 100,
          get: () =>
            this.api
              .get(`sensors/${id}`)
              .then((res) => res.data.state.temperature / 100),
          autoUpdate: UPDATE_SENSOR,
        });
      }

      if (data.state.presence !== undefined) {
        s.presence = new State({
          initial: data.state.presence,
          get: () =>
            this.api
              .get(`sensors/${id}`)
              .then((res) => res.data.state.presence),
          autoUpdate: UPDATE_PRESENCE,
        });
      }

      if (data.state.buttonevent !== undefined) {
        s.button = new HueButton(data.state, id, this);
      }

      sensors.set(uid, s);
    }

    return sensors.values();
  }

  async devices() {
    const lights = await this.allLights();
    const sensors = await this.allSensors();

    return [...lights, ...sensors];
  }
}
