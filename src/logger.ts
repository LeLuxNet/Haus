import logLevel from "loglevel";
import { PRODUCTION } from "./const";

const noColor = false;

function color(code: number) {
  if (noColor) return "";
  return `\x1b[${code}m`;
}

export class Logger {
  name: string;

  external: boolean = false;

  static _ = new Logger("");

  constructor(name: string) {
    this.name = name;
  }

  replaceLoglevel(l: logLevel.Logger) {
    l.trace = (...msgs) => this.debug(msgs.join(" "));
    l.debug = (...msgs) => this.debug(msgs.join(" "));
    l.log = (...msgs) => this.info(msgs.join(" "));
    l.info = (...msgs) => this.info(msgs.join(" "));
    l.warn = (...msgs) => this.warn(msgs.join(" "));
    l.error = (...msgs) => this.error(msgs.join(" "));
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
    if (this.external) {
      this.debug(msg);
    } else {
      console.log(this._prefix("info", 94) + msg);
    }
  }

  warn(msg: string) {
    console.warn(this._prefix("warn", 33) + msg);
  }

  error(msg: string) {
    console.error(this._prefix("error", 91) + msg);
  }
}
