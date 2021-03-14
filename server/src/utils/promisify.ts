import { exec as nativeExec } from "child_process";

export function exec(cmd: string) {
  return new Promise<void>((resolve, reject) => {
    nativeExec(cmd, (err) => {
      if (err !== null) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
