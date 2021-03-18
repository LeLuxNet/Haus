import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const SPLIT = true;

const httpLink = new HttpLink({
  uri: "http://localhost:80/graphql",
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:80/graphql-ws`,
  options: {
    reconnect: true,
  },
});

var link: ApolloLink;

if (SPLIT) {
  link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );
} else {
  link = wsLink;
}

export const client = new ApolloClient({
  link: wsLink,
  cache: new InMemoryCache(),
});
