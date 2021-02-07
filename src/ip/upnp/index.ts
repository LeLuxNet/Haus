import { createSocket, Socket } from "dgram";
import { networkInterfaces } from "os";
import { NAME } from "../../const";

const ip = "239.255.255.250";
const port = 1900;

export class UPnPClient {
  sockets: [string, Socket][] = [];

  constructor() {
    const ifaces = networkInterfaces();
    for (const [name, info] of Object.entries(ifaces)) {
      if (info === undefined) continue;

      info.forEach((val) => {
        if (!val.internal && val.family === "IPv4") {
          const socket = createSocket("udp4");
          socket.on("message", (chunk, info) => {
            console.log(chunk, info);
          });

          this.sockets.push([val.address, socket]);
        }
      });
    }
  }

  search(target: string = "ssdp:all") {
    this.sockets.forEach(([address, socket]) => {
      socket.bind(0, address, () => {
        socket.addMembership(ip, address);
        socket.setMulticastTTL(4);

        const pkt = Buffer.from(
          buildPacket({
            HOST: `${ip}:${port}`,
            MAN: '"ssdp:discover"',
            MX: 1,
            ST: target,
          })
        );

        socket.send(pkt, 0, pkt.length, port, ip);
      });
    });
  }
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
