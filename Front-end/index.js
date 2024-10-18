const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');

let window;
function createWindow(){
    window = new BrowserWindow({width: 1000, height: 600});
    window.loadURL(url.format({
        pathname: path.join(__dirname, './htmls/home/home.html'),
        protocol: 'file:',
        slashes: true
    }));
    //window.webContents.openDevTools();
    window.on('closed', () => {
        window = null;
    });
}

app.on('ready', createWindow);
console.log('Hello World');