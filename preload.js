const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  getShortcuts: () => ipcRenderer.invoke("get-shortcuts")
});
