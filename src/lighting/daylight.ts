import { Color } from "./color";

export function daylightColor(time: Date) {
  const h = time.getSeconds() / 3600 + time.getMinutes() / 60 + time.getHours();

  var t: number;
  if (h <= 3.5) {
    t = 3000;
  } else if (h <= 6.5) {
    t = h * 100 + 2650;
  } else if (h <= 8) {
    t = h * 1200 - 4500;
  } else if (h <= 10) {
    t = h * 200 + 3500;
  } else if (h <= 14) {
    t = 5500;
  } else if (h <= 20) {
    t = (h * -1100 + 31900) / 3;
  } else {
    t = h * -75 + 4800;
  }

  return Color.fromCCT(t);
}
