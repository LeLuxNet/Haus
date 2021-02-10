import { ColorState } from "../lighting/state";
import { Vector3 } from "./vector3";

export interface LightObject {
  readonly cords: [Vector3, ColorState][];
}
