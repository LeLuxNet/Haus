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
import { search } from "../../ip/upnp";
import { Logger } from "../../logger";
import { Outlet } from "../outlet";
import { Device } from "../../device";

const maxBri = 254;

const hueMult = 65535 / 360;
const briMult = maxBri / 255;
const satMult = 254 / 255;

export class PhilipsHue extends Lighting {
  api: AxiosInstance;

  constructor(
    host: string,
    key: string,
    id: string,
    home: Home,
    logger: Logger
  ) {
    super(id, home, logger);
    this.api = axios.create({
      baseURL: `${host}/api/${key}`,
    });
  }

  async allLights() {
    const res = await this.api.get("lights");
    const lights = Object.entries<any>(res.data);

    const devices = lights.map(([id, data]) => {
      const did = this.home.getDeviceId(this, data.uniqueid);

      const on = new State({
        initial: data.state.on,
        get: () =>
          this.api.get(`lights/${id}/state`).then((res) => res.data.on),
        set: (val) => this.api.put(`lights/${id}/state`, { on: val }),
      });

      var d: Device;
      if (data.state.bri === undefined) {
        d = new Outlet(did, this, on);
      } else {
        d = new Light(
          did,
          this,
          on,
          new ColorState({
            initial: parseColor(data.state),
            get: () =>
              this.api
                .get(`lights/${id}/state`)
                .then((res) => parseColor(res.data)),
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
      }

      d.name = data.name;
      d.reachable = new State({ initial: data.config.reachable });

      return d;
    });

    this.logger.info(`Loaded ${devices.length} lights`);
    return devices;
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

      s.reachable = new State({ initial: data.config.reachable });
      s.battery = new State({ initial: data.config.battery });

      if (!data.name.startsWith(data.productname)) {
        s.name = data.name;
      }

      if (data.state.lightlevel !== undefined) {
        s.illuminance = new State({
          initial: data.state.lightlevel,
          get: () =>
            this.api
              .get(`sensors/${id}`)
              .then((res) => 10 ** ((res.data.state.lightlevel - 1) / 10000)),
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

      if (data.state.humidity !== undefined) {
        s.temperature = new State<number>({
          initial: data.state.humidity / 100,
          get: () =>
            this.api
              .get(`sensors/${id}`)
              .then((res) => res.data.state.humidity / 100),
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

    const devices = Array.from(sensors.values());
    this.logger.info(`Loaded ${devices.length} sensors`);
    return devices;
  }

  async devices() {
    const lights = await this.allLights();
    const sensors = await this.allSensors();

    return [...lights, ...sensors];
  }
}

function parseColor(state: any) {
  if (state.hue !== undefined) {
    return Color.fromHSV(
      state.hue / hueMult,
      state.sat / satMult,
      state.bri / briMult
    );
  } else if (state.ct !== undefined) {
    const c = Color.fromCCT(1e9 / state.ct);
    c.y = state.bri / maxBri;
    return c;
  }

  const bri = state.bri / briMult;
  return Color.fromRGB(bri, bri, bri);
}

export async function create(
  { host, key }: { host: string; key?: string },
  id: string,
  home: Home,
  logger: Logger
) {
  if (key === undefined) {
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
      key = data.success.username as string;
    }
  }

  return new PhilipsHue(host, key, id, home, logger);
}

export async function discover(stealth: boolean, logger: Logger) {
  const ips: string[] = [];

  const upnp = search("urn:schemas-upnp-org:device:Basic:1").then((res) => {
    res.forEach((data) => {
      const id = data["hue-bridgeid"];
      if (id !== undefined) {
        const ip = new URL(data.location).host;
        ips.push(ip);
      }
    });
  });

  if (!stealth) {
    const res = await axios.get("https://discovery.meethue.com");
    res.data.forEach((e: any) => ips.push(e.internalipaddress));
  }

  await upnp;
  return ips;
}
