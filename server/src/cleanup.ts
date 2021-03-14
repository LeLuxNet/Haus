import { Logger } from "./logger";

const cleanup: (() => Promise<void>)[] = [];

export function onExit(fn: () => Promise<void>) {
  cleanup.push(fn);
}

async function handle() {
  Logger._.info("Cleaning up");
  await Promise.all(cleanup.map((c) => c()));

  Logger._.info("Exit");
  process.exit();
}

process.on("exit", handle);

process.on("SIGINT", handle);

process.on("SIGUSR1", handle);
process.on("SIGUSR2", handle);
