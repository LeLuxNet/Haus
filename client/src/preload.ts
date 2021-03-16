import { contextBridge, ipcRenderer } from "electron";
import { App } from "./app";

export const callChannel = ["minimize", "maximize", "close"] as const;
export const eventChannel = ["maximize"] as const;

const app: App = {
  call: (channel: typeof callChannel[number], ...args: any[]) => {
    if (!callChannel.includes(channel)) return;

    console.log(`Recieved '${channel}' event`);
    ipcRenderer.invoke(channel, ...args);
  },
  on: (
    channel: typeof eventChannel[number],
    callback: (...args: any[]) => void
  ) => {
    if (!eventChannel.includes(channel)) return;

    console.log(`Created '${channel}' listener`);
    ipcRenderer.on(channel, (_, ...data) => callback(...data));
  },
};

contextBridge.exposeInMainWorld("app", app);
