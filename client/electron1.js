const { app, BrowserWindow } = require('electron');
const {  ipcMain } = require('electron');
const fs = require('fs').promises; // Use promises API for easier async handling
const path = require('path');
const shell = require('electron').shell;
ipcMain.on('create-file', async (event, filePath, content) => {
    try {
        const fullPath = path.join(__dirname, filePath); // Construct full path. Adjust according to your path requirements
        await fs.writeFile(fullPath, content, 'utf-8');
        console.log(`File created at ${fullPath}`);
        event.reply('file-created-success', fullPath); // Optional: reply back to Renderer process if needed
    } catch (error) {
        console.error(`Failed to create file: ${error}`);
        event.reply('file-created-fail', error.message); // Optional: reply back on error
    }
});

function createWindow() {
    // Create the browser window.
    // const mainWindow = new BrowserWindow({
    //     width: 800,
    //     height: 600,
    //     webPreferences: {
    //         nodeIntegration: true,
    //     },
    // });

    if(0){
        let win = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true
            }
        });

        win.loadURL('https://example.com'); // Load any URL or local HTML file

    }else {
        const mainWindow = new BrowserWindow({
            // Other configurations
            webPreferences: {
                preload: path.join(__dirname, 'preload.js'),
                nodeIntegration: false, // for security
                contextIsolation: true, // for security, enable JavaScript context isolation
            },
        });




        // Visual zoom is disabled by default in Electron. To re-enable it
        mainWindow.webContents.setVisualZoomLevelLimits(1, 3)

        if (0){

            // Open external links in the default browser, the oauth will break
            mainWindow.webContents.setWindowOpenHandler(({ url }) => {
                shell.openExternal(url);
                return { action: 'deny' };
            });
        }

        // Load your app
        const startUrl = 'http://localhost:3000'; // for development
        // Or, for production: `file://${path.join(__dirname, '../build/index.html')}`;
        mainWindow.loadURL(startUrl);


        
        if (0){
            // Open the DevTools.
            mainWindow.webContents.openDevTools();


        }


    }







}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});