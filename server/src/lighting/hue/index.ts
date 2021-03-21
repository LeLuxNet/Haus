import axios, { AxiosInstance } from "axios";
import "matrix-js-sdk";
import { UPDATE_LIGHT, UPDATE_PRESENCE, UPDATE_SENSOR } from "../../const";
import { Device } from "../../device";
import { Logger } from "../../logger";
import { Platform } from "../../platform";
import { Plugin } from "../../plugins";
import { Sensor } from "../../sensors/sensor";
import { Home } from "../../server/home";
import { State } from "../../state";
import { Color } from "../color";
import { Light } from "../light";
import { Outlet } from "../outlet";
import { ColorState } from "../state";
import { HueButton } from "./button";

const maxBri = 254;

const hueMult = 65535 / 360;
const briMult = maxBri / 255;
const satMult = 254 / 255;

async function allLights(
  api: AxiosInstance,
  platform: Platform,
  home: Home,
  logger: Logger
) {
  const res = await api.get("lights");
  const lights = Object.entries<any>(res.data);

  const devices = lights.map(([id, data]) => {
    const did = home.getDeviceId(platform, data.uniqueid);

    const on = new State({
      initial: data.state.on,
      get: () => api.get(`lights/${id}`).then((res) => res.data.state.on),
      set: (val) => api.put(`lights/${id}/state`, { on: val }),
      autoUpdate: UPDATE_LIGHT,
    });

    var d: Device;
    if (data.state.bri === undefined) {
      d = new Outlet(did, platform, on);
    } else {
      d = new Light(
        did,
        platform,
        on,
        new ColorState({
          initial: parseColor(data.state),
          get: () =>
            api.get(`lights/${id}`).then((res) => parseColor(res.data.state)),
          set: (val) => {
            const [h, s, v] = val.toHSV();
            return api.put(`lights/${id}/state`, {
              hue: Math.round(h * hueMult),
              sat: Math.round(s * satMult),
              bri: Math.round(v * briMult),
            });
          },
          autoUpdate: UPDATE_LIGHT,
        })
      );
    }

    d.name = data.name;
    d.reachable = new State({ initial: data.config.reachable });

    return d;
  });

  logger.info(`Loaded ${devices.length} lights`);
  return devices;
}

async function allSensors(
  api: AxiosInstance,
  platform: Platform,
  home: Home,
  logger: Logger
) {
  const res = await api.get("sensors");

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
      sensors.get(uid) || new Sensor(home.getDeviceId(platform, uid), platform);

    s.reachable = new State({ initial: data.config.reachable });
    s.battery = new State({ initial: data.config.battery });

    if (!data.name.startsWith(data.productname)) {
      s.name = data.name;
    }

    if (data.state.lightlevel !== undefined) {
      s.illuminance = new State({
        initial: data.state.lightlevel,
        get: () =>
          api
            .get(`sensors/${id}`)
            .then((res) => 10 ** ((res.data.state.lightlevel - 1) / 10000)),
        autoUpdate: UPDATE_SENSOR,
      });
    }

    if (data.state.temperature !== undefined) {
      s.temperature = new State<number>({
        initial: data.state.temperature / 100,
        get: () =>
          api
            .get(`sensors/${id}`)
            .then((res) => res.data.state.temperature / 100),
        autoUpdate: UPDATE_SENSOR,
      });
    }

    if (data.state.humidity !== undefined) {
      s.temperature = new State<number>({
        initial: data.state.humidity / 100,
        get: () =>
          api.get(`sensors/${id}`).then((res) => res.data.state.humidity / 100),
        autoUpdate: UPDATE_SENSOR,
      });
    }

    if (data.state.presence !== undefined) {
      s.presence = new State({
        initial: data.state.presence,
        get: () =>
          api.get(`sensors/${id}`).then((res) => res.data.state.presence),
        autoUpdate: UPDATE_PRESENCE,
      });
    }

    if (data.state.buttonevent !== undefined) {
      s.button = new HueButton(data.state, id, api);
    }

    sensors.set(uid, s);
  }

  const devices = Array.from(sensors.values());
  logger.info(`Loaded ${devices.length} sensors`);
  return devices;
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
    return new Color(c.x, state.bri / maxBri, c.z);
  }

  const bri = state.bri / briMult;
  return Color.fromRGB(bri, bri, bri);
}

export default <Plugin>{
  name: "Philips Hue",

  create: async ({ host, key }, id, home, logger) => {
    const api = axios.create({
      baseURL: `${host}/api/${key}`,
    });

    return new Platform(id, home, logger, async (platform) => [
      ...(await allLights(api, platform, home, logger)),
      ...(await allSensors(api, platform, home, logger)),
    ]);
  },
};
