export type MAC = [number, number, number, number, number, number];

class MalformedMACError extends Error {
  constructor(mac: string) {
    super(mac);
    this.name = "MalformedMACError";
  }
}

export function parseMac(mac: string): MAC {
  const parts = mac.split(/[:-]/);
  if (parts.length !== 6) throw new MalformedMACError(mac);

  const rawMac = parts.map((p) => {
    const res = parseInt(p, 16);
    if (res < 0 || res > 255) throw new MalformedMACError(mac);
    return res;
  });

  return rawMac as MAC;
}
