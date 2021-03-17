import { Arg, Query, Resolver } from "type-graphql";
import { Home, homes } from "../../server/home";

@Resolver(Home)
export class HomeResolver {
  @Query(() => Home, { nullable: true })
  async home(@Arg("id") id: string) {
    return homes.get(id);
  }
}
