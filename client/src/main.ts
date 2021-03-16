import { app, BrowserWindow, ipcMain } from "electron";
import { join } from "path";

const dev = process.env.APP_DEV !== undefined;

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      allowRunningInsecureContent: false,
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
      sandbox: true,
      preload: join(__dirname, "preload.js"),
    },
    icon: join(__dirname, "../public/logos/icon.png"),
  });

  if (dev) {
    win.loadURL("http://localhost:8080");
  } else {
    console.log(__dirname);
    win.loadFile(join(__dirname, "../public/index.html"));
  }

  ipcMain.handle("minimize", () => win.minimize());
  ipcMain.handle("toggleMaximize", () => {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  });
  ipcMain.handle("close", () => win.close());

  // win.webContents.openDevTools();
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
