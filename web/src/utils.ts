import { App } from "./app";

export function getApp(): App | undefined {
  return (window as any).app;
}
