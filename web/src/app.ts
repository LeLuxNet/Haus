export const callChannel = ["minimize", "maximize", "close"] as const;
export const eventChannel = ["maximize"] as const;

export interface App {
  call(channel: "minimize"): void;
  call(channel: "maximize", max?: boolean): void;
  call(channel: "close"): void;
  call(channel: typeof callChannel[number], ...args: any[]): void;

  on(channel: "maximize", callback: (max: boolean) => void): void;
  on(
    channel: typeof eventChannel[number],
    callback: (...args: any[]) => void
  ): void;
}
