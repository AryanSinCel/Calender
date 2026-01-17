const {app, BrowserWindow, ipcMain} = require("electron");
const path = require("path");

let mainWindow = null;
let colorPickerWindow = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 214,
        height: 228,
        resizable: false,
        maximizable: false,
        fullscreenable: false,
        frame: false,
        transparent: true,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            preload: path.join(__dirname, 'preload.js')
        },
        opacity: 0.8
    });

    mainWindow.loadFile("index.html");

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

function createColorPickerWindow() {
    if (colorPickerWindow) {
        colorPickerWindow.focus();
        return;
    }

    colorPickerWindow = new BrowserWindow({
        width: 214,
        height: 228,
        resizable: false,
        maximizable: false,
        frame: true,
        show: true,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        }
    });

    colorPickerWindow.loadFile("color-picker.html");
    colorPickerWindow.show();

    colorPickerWindow.on('closed', () => {
        colorPickerWindow = null;
    });
}

// IPC handlers
ipcMain.on('open-color-picker', () => {
    createColorPickerWindow();
});

ipcMain.on('update-colors', (event, colors) => {
    if (mainWindow) {
        mainWindow.webContents.send('apply-colors', colors);
    }
});

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});