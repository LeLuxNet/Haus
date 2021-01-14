export class RazerError extends Error {
  constructor(code: number, message: string) {
    super(`${code}: ${message}`);
    this.name = "RazerError";
  }
}
