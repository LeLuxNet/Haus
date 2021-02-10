import express from "express";
import { Device } from "../device";
import { Color } from "../lighting/color";
import { ColorState } from "../lighting/state";
import { Home, homes } from "./home";

declare global {
  namespace Express {
    export interface Request {
      home: Home;
      device: Device;
    }
  }
}

export function createApi() {
  const app = express();

  app.use(express.json());

  app.param("home", (req, res, next, id) => {
    const home = homes.get(id);

    if (home === undefined) {
      res.sendStatus(404);
      return;
    }

    // TODO: Authentication

    req.home = home;
    next();
  });

  app.get("/home/:home", (req, res) => {
    res.send({
      id: req.home.id,
      name: req.home.name,
    });
  });

  app.get("/home/:home/devices", (req, res) => {
    res.send(req.home.devices.filter((d) => d !== undefined).map(deviceData));
  });

  function deviceData(d: Device) {
    const vals = d.values;
    Object.keys(vals).map((key) => {
      var val = vals[key]?.last;
      if (val instanceof Color) {
        const [r, g, b] = val.toRGB();
        val = { r, g, b };
      }
      vals[key] = val;
    });

    return {
      id: d.id,
      name: d.name,
      type: d.type,

      reachable: d.reachable?.last,
      battery: d.battery?.last,

      data: vals,
    };
  }

  app.param("device", (req, res, next, id) => {
    const device = req.home.devices[id];

    if (device === undefined) {
      res.sendStatus(404);
      return;
    }

    // TODO: Authentication

    req.device = device;
    next();
  });

  app.get("/home/:home/device/:device", (req, res) => {
    res.send(deviceData(req.device));
  });

  app.put("/home/:home/device/:device", (req, res) => {
    const values = req.device.values;
    Object.entries<any>(req.body).forEach(([key, val]) => {
      const set = values[key]?.set;
      if (set !== undefined) {
        if (val.r !== undefined && val.g !== undefined && val.b !== undefined) {
          val = Color.fromRGB(val.r, val.g, val.b);
        }
        set(val);
      }
    });
    res.send(deviceData(req.device));
  });

  return app;
}
