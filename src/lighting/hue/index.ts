import axios, { AxiosInstance } from "axios";
import { Lighting } from "../lighting";
import { Light } from "../light";
import { HueLight, HueLightState, HueSensor, HueSensorState } from "./api";
import { State } from "../../state";
import { Sensor } from "../../sensors/sensor";
import { NAME } from "../../const";

const hueMult = 65535 / 360;

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
    const lights = <[string, HueLight][]>Object.entries(res.data);

    return lights.map(([id, data]) => {
      const on = new State(
        data.state.on,
        () => this.getLightState(id).then((s) => s.on),
        (val) => this.setLightState(id, { on: val })
      );

      const l = new Light(on);

      if (data.state.bri !== undefined) {
        l.bri = new State(
          data.state.bri,
          () => this.getLightState(id).then((s) => s.bri!),
          (val) => this.setLightState(id, { bri: val })
        );
      }

      if (data.state.hue !== undefined) {
        l.hue = new State(
          data.state.hue,
          () => this.getLightState(id).then((s) => s.hue! / hueMult),
          (val) => this.setLightState(id, { hue: val * hueMult })
        );
      }

      if (data.state.sat !== undefined) {
        l.sat = new State(
          data.state.hue,
          () => this.getLightState(id).then((s) => s.sat!),
          (val) => this.setLightState(id, { sat: val })
        );
      }

      return l;
    });
  }

  async allSensors() {
    const res = await this.api.get("sensors");
    const sensors = <[string, HueSensor][]>Object.entries(res.data);

    return sensors.map(([id, data]) => {
      const s = new Sensor();

      if (data.state.lightlevel !== undefined) {
        s.lightlevel = new State(
          data.state.lightlevel,
          () => this.getSensorState(id).then((s) => s.lightlevel!),
          undefined
        );
      }

      if (data.state.temperature !== undefined) {
        s.temperature = new State(
          data.state.temperature,
          () => this.getSensorState(id).then((s) => s.temperature!),
          undefined
        );
      }

      if (data.state.presence !== undefined) {
        s.presence = new State(
          data.state.presence,
          () => this.getSensorState(id).then((s) => s.presence!),
          undefined
        );
      }

      return s;
    });
  }

  private async getLightState(id: string): Promise<HueLightState> {
    const res = await this.api.get(`lights/${id}/state`);
    return res.data;
  }

  private async setLightState(id: string, state: object) {
    await this.api.put(`lights/${id}/state`, state);
  }

  private async getSensorState(id: string): Promise<HueSensorState> {
    const res = await this.api.get(`sensors/${id}/state`);
    return res.data;
  }
}
