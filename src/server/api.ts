import express from "express";
import { Home, homes } from "./home";

declare global {
  namespace Express {
    export interface Request {
      home: Home;
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
    res.send(
      req.home.devices
        .filter((d) => d !== undefined)
        .map((d) => {
          return {
            id: d.id,
            name: d.name,
            data: d.data,

            reachable: d.reachable?.last,
            battery: d.battery?.last,
          };
        })
    );
  });

  return app;
}
