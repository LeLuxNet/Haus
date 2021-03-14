import express from "express";
import { createServer, Server } from "http";
import { server as WebSocketServer } from "websocket";
import { Device } from "../device";
import { Color } from "../lighting/color";
import { State } from "../state";
import { verifyAuth } from "./auth";
import { Home, homes } from "./home";

declare global {
  namespace Express {
    export interface Request {
      home: Home;
      device: Device;
    }
  }
}

function deviceData(d: Device) {
  const data = d.values;
  Object.keys(data).forEach(
    (key) => (data[key] = State.toJSON(data[key]?.last))
  );

  return {
    id: d.id,
    name: d.name,
    type: d.type,

    reachable: d.reachable?.last,
    battery: d.battery?.last,

    data,
  };
}

export function createApi() {
  const app = express();
  const server = createServer(app);

  createWebSocket(server);

  app.use(express.json());

  app.param("home", (req, res, next, id) => {
    const home = homes.get(id);

    if (home === undefined) {
      res.sendStatus(404);
      return;
    }

    const auth = verifyAuth(req.headers.authorization);
    if (auth !== 0) {
      res.sendStatus(auth);
      return;
    }

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

  return server;
}

function createWebSocket(server: Server) {
  const ws = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false,
  });

  ws.on("request", (req) => {
    var auth: number | undefined;

    if (
      req.resourceURL.query !== null &&
      typeof req.resourceURL.query !== "string"
    ) {
      const query = req.resourceURL.query["auth"];
      if (typeof query !== "object") {
        auth = verifyAuth(query);
      }
    }

    if (auth === undefined) {
      auth = verifyAuth();
    }
    if (auth !== 0) {
      req.reject(auth);
      return;
    }

    const conn = req.accept("echo-protocol", req.origin);

    const subs: (() => void)[] = [];

    conn.on("message", (msg) => {
      if (msg.utf8Data !== undefined) {
        const raw = JSON.parse(msg.utf8Data);
        const data = raw[1];
        console.log(raw);

        switch (raw[0]) {
          case "sub":
            const home = homes.get(data.home);
            if (home === undefined) return;

            if (data.device === undefined) {
              const fn = (val: any) => conn.send(JSON.stringify(val));
              home.subscribe(fn, conn);
            } else {
            }

            break;
        }
      }
    });

    conn.on("close", (reason, desc) => {
      subs.forEach((fn) => fn());
      console.log("Disconnected", reason, desc);
    });
  });
}
