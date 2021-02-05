export const PRODUCTION = process.env.NODE_ENV === "production";

export const NAME = "Haus";
export const VERSION =
  require("../package.json").version + (PRODUCTION ? "" : "-dev");

export const AUTHOR = "LeLuxNet";
export const AUTHOR_LINK = "https://www.lelux.net";

export const UPDATE_LIGHT = 10;
export const UPDATE_SENSOR = 5;
export const UPDATE_PRESENCE = 3;
export const UPDATE_BUTTON = 5;

const msg = `${NAME} v${VERSION}`;
console.log(msg);
console.log("-".repeat(msg.length));
console.log();
