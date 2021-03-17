import express from "express";
import { execute, subscribe } from "graphql";
import { resolve } from "path";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { buildSchema } from "type-graphql";
import { Logger } from "../logger";
import { homes } from "../server/home";
import { HomeResolver } from "./graphql/home";

const port = 80;

const schema = buildSchema({
  resolvers: [HomeResolver],
  emitSchemaFile: resolve(__dirname, "schema.gql"),
});

export const roots = {
  query: {
    home: ({ id }: { id: string }) => {
      return homes.get(id);
    },
  },
  subscription: {},
};

export async function createApi() {
  const app = express();

  const server = app.listen(port, async () => {
    new SubscriptionServer(
      {
        schema: await schema,
        execute,
        subscribe,
      },
      {
        server,
        path: "/graphql",
      }
    );

    Logger._.info(`Listening on port ${port}`);
  });
}
