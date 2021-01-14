import { Device } from "../device";
import { State } from "../state";

export class Sensor extends Device {
  presence?: State<boolean>;
  lightlevel?: State<number>;
  temperature?: State<number>;
}
