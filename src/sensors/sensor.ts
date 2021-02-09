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

  get values() {
    return {
      presence: this.presence,
      lightlevel: this.lightlevel,
      temperature: this.temperature,
      humidity: this.humidity,
    };
  }
}
