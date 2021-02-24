import { getPosition, getTimes } from "suncalc";
import { fromRadians } from "../utils/math";
import { Location } from "./location";

export function sunPosition(loc: Location, date: Date) {
  const pos = getPosition(date, loc.latitude, loc.longitude);
  return {
    altitude: fromRadians(pos.altitude),
    azimuth: fromRadians(pos.azimuth),
  };
}

export function sunTimes(loc: Location, date: Date) {
  const times = getTimes(date, loc.latitude, loc.longitude);
  return {
    sunrise: times.sunrise,
    sunset: times.sunset,
  };
}
