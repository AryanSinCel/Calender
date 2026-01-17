const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    openColorPicker: () => ipcRenderer.send('open-color-picker'),
    onColorsUpdate: (callback) => ipcRenderer.on('apply-colors', (event, colors) => callback(colors))
});
