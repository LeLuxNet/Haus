import { PRODUCTION } from "./const";

function color(code: number) {
  return `\x1b[${code}m`;
}

export class Logger {
  name: string;

  static _ = new Logger("");

  constructor(name: string) {
    this.name = name;
  }

  _prefix(level: string, code: number) {
    var prefix = `${color(code)}${level}${color(0)}: `;
    if (this.name.length !== 0) {
      prefix += `${color(90)}[${this.name}]${color(0)} `;
    }

    return prefix;
  }

  debug(msg: string) {
    if (!PRODUCTION) {
      console.debug(this._prefix("debug", 96) + msg);
    }
  }

  info(msg: string) {
    console.log(this._prefix("info", 94) + msg);
  }

  warn(msg: string) {
    console.warn(this._prefix("warn", 33) + msg);
  }

  error(msg: string) {
    console.error(this._prefix("error", 91) + msg);
  }
}
