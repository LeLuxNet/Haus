export function verifyAuth(token?: string): number {
  if (token === undefined) {
    return 401;
  }

  if (token === "Access-Token") {
    return 0;
  }

  return 403;
}
