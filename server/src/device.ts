import { Field, Int, ObjectType } from "type-graphql";
import { Platform } from "./platform";
import { State } from "./state";
import { Trigger } from "./trigger";

@ObjectType()
export abstract class Device extends Trigger<any> {
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

  subscribe(fn: (val: any) => void, anchor: any) {
    const unsub = super.subscribe(fn, anchor);

    if (this.subscriptions.length === 1) {
      Object.entries(this.values).forEach(([name, val]) => {
        if (val !== undefined) {
          val.subscribe((v) => this.trigger({ [name]: v }), this);
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
