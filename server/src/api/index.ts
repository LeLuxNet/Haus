import { ApolloServer } from "apollo-server-express";
import express from "express";
import { execute, subscribe } from "graphql";
import { resolve } from "path";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { buildSchema } from "type-graphql";
import { Logger } from "../logger";
import { homes } from "../server/home";
import { HomeResolver } from "./graphql/home";

const port = 80;

export const roots = {
  query: {
    home: ({ id }: { id: string }) => {
      return homes.get(id);
    },
  },
  subscription: {},
};

export async function createApi() {
  const schema = await buildSchema({
    resolvers: [HomeResolver],
    emitSchemaFile: resolve(__dirname, "schema.gql"),
  });

  const app = express();

  const apolloServer = new ApolloServer({ schema });
  apolloServer.applyMiddleware({ app });

  const server = app.listen(port, async () => {
    new SubscriptionServer(
      {
        schema,
        execute,
        subscribe,
      },
      {
        server,
        path: "/graphql-ws",
      }
    );

    Logger._.info(`Listening on port ${port}`);
  });
}
