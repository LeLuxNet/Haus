import axios from "axios";
import { createWriteStream, promises } from "fs";
import { Readable } from "stream";

export type File = string | Readable | Buffer;

export async function saveFile(file: File, path?: string) {
  path = "test.bin";

  const stream = createWriteStream(path);
  if (typeof file === "string") {
    const res = await axios.get(file, {
      responseType: "stream",
    });
    res.data.pipe(stream);
  } else if (file instanceof Readable) {
    file.pipe(stream);
  } else {
    stream.write(file);
  }

  return path;
}

export function deleteFile(path: string) {
  return promises.unlink(path);
}
