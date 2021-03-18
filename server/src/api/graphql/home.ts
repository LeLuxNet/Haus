import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Color } from "../../lighting/color";
import { Home, homes } from "../../server/home";
import { InputValue, Value } from "./value";

@Resolver(Home)
export class HomeResolver {
  @Query(() => Home, { nullable: true })
  async home(@Arg("id") id: string) {
    return homes.get(id);
  }

  @Mutation(() => Value, { nullable: true })
  async setValue(
    @Arg("home") home: string,
    @Arg("device") device: number,
    @Arg("key") key: string,
    @Arg("value") value: InputValue
  ) {
    const state = homes.get(home)?.devices[device]?.values[key];
    if (state === undefined) return;

    if (value.boolean !== undefined) {
      state.set!(value.boolean);
    } else if (value.number !== undefined) {
      state.set!(value.number);
    } else if (value.color !== undefined) {
      var col: Color;
      if (
        value.color.x !== undefined &&
        value.color.y !== undefined &&
        value.color.z !== undefined
      ) {
        col = new Color(value.color.x!, value.color.y!, value.color.z!);
      } else if (
        value.color.r !== undefined &&
        value.color.g !== undefined &&
        value.color.b !== undefined
      ) {
        col = Color.fromRGB(value.color.r, value.color.g, value.color.b);
      } else if (
        value.color.h !== undefined &&
        value.color.s !== undefined &&
        value.color.v !== undefined
      ) {
        col = Color.fromHSV(value.color.s, value.color.s, value.color.v);
      } else if (value.color.ct !== undefined) {
        col = Color.fromCCT(value.color.ct);
      } else {
        throw "Need all three values from xyz, rgb, hsv or a single ct value";
      }
      await state.set!(col);
    }
  }
}
