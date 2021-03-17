import { ApolloClient, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";

const wsLink = new WebSocketLink({
  uri: `ws://localhost:80/graphql`,
  options: {
    reconnect: true,
  },
});

export const client = new ApolloClient({
  link: wsLink,
  cache: new InMemoryCache(),
});
