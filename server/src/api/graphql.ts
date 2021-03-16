import { buildSchema } from "graphql";

export const schema = buildSchema(`
type Query {
  example: String
}
`);

export const roots = {
  query: {},
  subscription: {},
};
