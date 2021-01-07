import { State } from "../state";

export class Sensor {
  presence?: State<boolean>;
  lightlevel?: State<number>;
  temperature?: State<number>;
}
