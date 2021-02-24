import { getMoonPosition } from "suncalc";
import { fromRadians } from "../utils/math";
import { Location } from "./location";

export function moonPosition(loc: Location, date: Date) {
  const pos = getMoonPosition(date, loc.latitude, loc.longitude);
  return {
    altitude: fromRadians(pos.altitude),
    azimuth: fromRadians(pos.azimuth),
  };
}
