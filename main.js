// Modules to control application life and create native browser window
const {
  app,
  BrowserWindow,
  Menu,
  screen,
  dialog,
  ipcMain
} = require('electron')

const path = require('path')
//定义菜单模板
const template = require('./menu')
const fs = require('fs')


function createWindow() {
  const {
    width,
    height
  } = screen.getPrimaryDisplay().workAreaSize
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
      enableRemoteModule: true,
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  // set menu
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  // mainWindow.on('ready-to-show', () => {
  //   mainWindow.show();
  // });
  // mainWindow.on('closed', () => {
  //   console.log('closed');
  //   mainWindow = null;
  // });

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.