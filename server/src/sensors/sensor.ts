import { Device } from "../device";
import { State } from "../state";
import { Trigger } from "../trigger";
import { Press } from "./button";

export class Sensor extends Device {
  presence?: State<boolean>;
  illuminance?: State<number>; // lux
  temperature?: State<number>; // °C
  humidity?: State<number>; // %

  button?: Trigger<Press>;

  get type() {
    return "sensor";
  }

  get values() {
    return {
      presence: this.presence,
      illuminance: this.illuminance,
      temperature: this.temperature,
      humidity: this.humidity,
    };
  }
}
