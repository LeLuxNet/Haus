import { app, BrowserWindow } from "electron";
import { join } from "path";

const dev = process.env.APP_DEV !== undefined;

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: join(__dirname, "preload.js"),
    },
  });

  if (dev) {
    mainWindow.loadURL("http://localhost:8080");
  } else {
    mainWindow.loadFile(join(__dirname, "../out/index.html"));
  }

  // mainWindow.webContents.openDevTools();
}

app.on("ready", () => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});