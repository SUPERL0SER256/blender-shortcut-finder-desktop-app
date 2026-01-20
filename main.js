const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

let cachedShortcuts = null;

function loadShortcutsFromCSV() {
  if (cachedShortcuts) return cachedShortcuts;

  const filePath = path.join(
    __dirname,
    "data",
    "blender_industry_compatible_shortcuts.csv"
  );

  const raw = fs.readFileSync(filePath, "utf-8");
  const lines = raw.split("\n").slice(1); 

  const shortcuts = lines
    .map(line => {
      const [category, action, shortcut, notes] = line.split(",");
      if (!action || !shortcut) return null;

      return {
  category: category?.trim(),
  action: action?.trim(),
  shortcut: shortcut?.trim(),
  notes: notes?.trim()
      };
    })
    .filter(Boolean);

  cachedShortcuts = shortcuts;
  return shortcuts;
}

ipcMain.handle("get-shortcuts", () => {
  return loadShortcutsFromCSV();
});

function createWindow() {
  const win = new BrowserWindow({
    width: 292,
    height: 430,
    frame: false,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true
    }
  });

  win.loadFile("index.html");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
