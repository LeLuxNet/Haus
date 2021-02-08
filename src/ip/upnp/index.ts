import { createSocket, Socket } from "dgram";
import { EventEmitter } from "events";

const ip = "239.255.255.250";
const port = 1900;

interface Headers {
  [key: string]: string;
}
const _event = new EventEmitter();

const socket = createSocket("udp4");
socket.on("message", (chunk, info) => {
  const msg = chunk.toString().split("\r\n");

  const http = msg.shift();
  if (http === undefined || !http.startsWith("HTTP/")) return;

  const headers: Headers = {};
  msg.forEach((m) => {
    const index = m.indexOf(":");
    if (index === -1) return;

    headers[m.slice(0, index).toLowerCase()] = m.slice(index + 1).trim();
  });

  _event.emit("data", headers);
});

export async function search(target: string = "ssdp:all") {
  const time = 3;

  const res: Headers[] = [];
  socket.bind(() => {
    const pkt = Buffer.from(
      buildPacket({
        HOST: `${ip}:${port}`,
        MAN: '"ssdp:discover"',
        MX: time,
        ST: target,
      })
    );

    _event.on("data", (headers) => {
      if (target === "ssdp:all" || headers.st === target) {
        res.push(headers);
      }
    });

    socket.send(pkt, 0, pkt.length, port, ip);
  });

  return new Promise<Headers[]>((resolve) => {
    setTimeout(() => resolve(res), 1000 * time);
  });
}

function buildPacket(data: { [key: string]: any }) {
  return (
    "M-SEARCH * HTTP/1.1\r\n" +
    Object.entries(data)
      .map(([key, val]) => `${key}: ${val}\r\n`)
      .join("") +
    "\r\n"
  );
}
