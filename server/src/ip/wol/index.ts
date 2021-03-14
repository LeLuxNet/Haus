import { createSocket } from "dgram";
import { MAC } from "../../utils/mac";

const headerLength = 6;
const macRepeat = 16;

export async function wake(mac: MAC) {
  var buffer = Buffer.alloc(headerLength, 255);

  const macBuffer = Buffer.from(mac);
  for (let i = 0; i < macRepeat; i++) {
    buffer = Buffer.concat([buffer, macBuffer]);
  }

  const socket = createSocket("udp4");
  socket.once("listening", () => socket.setBroadcast(true));

  return new Promise<void>((resolve, reject) =>
    socket.send(buffer, 0, buffer.length, 9, "255.255.255.255", (err) => {
      if (err) reject(err);
      socket.close(resolve);
    })
  );
}
