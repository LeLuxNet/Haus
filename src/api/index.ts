import express from "express";
import { execute, subscribe } from "graphql";
import { useServer } from "graphql-ws/lib/use/ws";
import { join } from "path";
import { Server } from "ws";
import { Logger } from "../logger";
import { roots, schema } from "./graphql";

const port = 80;

export function createApi() {
  const app = express();

  app.get("/", express.static(join(__dirname, "../../web/dist")));
  app.get("/*", (_, res) =>
    res.sendFile(join(__dirname, "../../web/index.html"))
  );

  const server = app.listen(port, () => {
    const wsServer = new Server({
      server,
      path: "/graphql",
    });

    useServer(
      {
        schema,
        roots,
        execute,
        subscribe,
      },
      wsServer
    );

    Logger._.info(`Listening on port ${port}`);
  });
}
