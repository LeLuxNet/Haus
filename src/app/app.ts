import { app, BrowserWindow } from "electron";
import path from "path";
import { startServer } from "../server";

startServer("31313");

function createWindow() {
  const mainWindow = new BrowserWindow({
    height: 600,
    icon: path.join(__dirname, "../../icon.png"),
    width: 800,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile(path.join(__dirname, "../../web/index.html"));

  // mainWindow.webContents.openDevTools();
}

app.on("ready", () => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
