import { Arg, Field, Int, ObjectType } from "type-graphql";
import { Value } from "./api/graphql/value";
import { Color } from "./lighting/color";
import { Platform } from "./platform";
import { State } from "./state";
import { Trigger } from "./trigger";

export type TriggerTypes = number | boolean | Color;

@ObjectType()
export abstract class Device extends Trigger<TriggerTypes> {
  @Field(() => Int)
  id: number;

  @Field()
  name?: string;

  platform: Platform;

  reachable?: State<boolean>;
  battery?: State<boolean>;

  constructor(id: number, platform: Platform) {
    super();
    this.id = id;
    this.platform = platform;
  }

  abstract get type(): string;

  abstract get values(): { [key: string]: State<any> | undefined };

  @Field(() => [Value], { name: "values" })
  apiValues() {
    const vals = Object.entries(this.values).filter(
      ([_, val]) => val !== undefined
    ) as [string, State<any>][];

    return vals.map(([key, val]) => new Value(key, val));
  }

  @Field(() => Value, { nullable: true })
  value(@Arg("key") key: string) {
    const val = this.values[key];
    if (val === undefined) return undefined;

    return new Value(key, val);
  }

  subscribe(fn: (val: any) => void, anchor: any) {
    const unsub = super.subscribe(fn, anchor);

    if (this.subscriptions.length === 1) {
      Object.entries(this.values).forEach(([name, val]) => {
        if (val !== undefined) {
          // val.subscribe((v) => this.trigger({ [name]: v }), this);
        }
      });
    }

    return () => {
      unsub();

      if (this.subscriptions.length === 0) {
        Object.values(this.values).forEach((val) => {
          if (val !== undefined) {
            val.disconnectAnchor(this);
          }
        });
      }
    };
  }
}
