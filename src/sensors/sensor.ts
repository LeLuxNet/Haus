import { Device } from "../device";
import { State } from "../state";
import { Trigger } from "../trigger";
import { Press } from "./button";

export class Sensor extends Device {
  presence?: State<boolean>;
  lightlevel?: State<number>;
  temperature?: State<number>;
  humidity?: State<number>;
  button?: Trigger<Press>;

  get type() {
    return "sensor";
  }

  get data() {
    return {
      presence: this.presence?.last,
      lightlevel: this.lightlevel?.last,
      temperature: this.temperature?.last,
    };
  }
}
