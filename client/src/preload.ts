import { contextBridge, ipcRenderer } from "electron";
import { App } from "./app";

const app: App = {
  minimize: () => ipcRenderer.invoke("minimize"),
  toggleMaximize: () => ipcRenderer.invoke("toggleMaximize"),
  close: () => ipcRenderer.invoke("close"),
};

contextBridge.exposeInMainWorld("app", app);
