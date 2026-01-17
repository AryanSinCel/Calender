const {app, BrowserWindow} = require("electron");

function createWindow() {
    const win = new BrowserWindow({
        width: 214,
        height: 228,
        resizable: false,
        maximizable: false,
        fullscreenable: false,
        frame: false,
        transparent: true,
        webPreferences: {
            contextIsolation: true
        },
        opacity: 0.8
    });

    win.loadFile("index.html")
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});