import { Field, Float, InputType, ObjectType } from "type-graphql";
import { TriggerTypes } from "../../device";
import { Color } from "../../lighting/color";
import { State } from "../../state";
import { ColorValue, InputColor } from "./color";

@InputType()
export class InputValue {
  @Field(() => Boolean, { nullable: true })
  boolean?: boolean;

  @Field(() => Float, { nullable: true })
  number?: number;

  @Field(() => InputColor, { nullable: true })
  color?: InputColor;
}

@ObjectType()
export class Value<T extends TriggerTypes> {
  @Field()
  key: string;

  val: State<T>;

  @Field(() => Float, { nullable: true })
  async number() {
    const val = this.val.get();
    return typeof val === "number" ? val : undefined;
  }

  @Field(() => Boolean, { nullable: true })
  async boolean() {
    const val = this.val.get();
    return typeof val === "boolean" ? val : undefined;
  }

  @Field(() => ColorValue, { nullable: true })
  async color() {
    const val = this.val.get();
    return val instanceof Color ? new ColorValue(val) : undefined;
  }

  constructor(key: string, val: State<T>) {
    this.key = key;
    this.val = val;
  }
}
