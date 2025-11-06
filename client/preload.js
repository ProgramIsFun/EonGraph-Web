// In preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    createFile: (filePath, content) => ipcRenderer.send('create-file', filePath, content),
    // Listen for success or failure messages if you implemented replies
    onFileCreated: (callback) => ipcRenderer.on('file-created-success', callback),
    onFileCreationFailed: (callback) => ipcRenderer.on('file-created-fail', callback),
});
