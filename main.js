const { app, BrowserWindow } = require('electron');
const path = require('path');
let mainWindow;


function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            preload: path.join(__dirname, "preload.js")
        },
        show: false,
    });
    mainWindow.setMenuBarVisibility(false)
    mainWindow.maximize()
    mainWindow.loadURL('http://localhost:3000/');
    mainWindow.on('closed', function () {
        mainWindow = null
    });
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
});

app.on('activate', function () {
    if (mainWindow === null) createWindow()
});