import { app, BrowserWindow, ipcMain, Menu, Tray } from 'electron'
import { join } from 'path'
import './dialog'
import { Logger } from './logger'
import { initialize } from './services'

let appTray = null
let trayContextMenu = null
let appCurrentWindowId: number | null = null

async function main() {
  const logger = new Logger()
  logger.initialize(app.getPath('userData'))
  initialize(logger)
  // app.commandLine.appendSwitch('disable-gpu')
  // app.commandLine.appendSwitch('disable-pinch')
  app.whenReady().then(() => {
    createWindow()
    // tray icon
    const trayMenuTemplate = [
      {
        label: '退出',
        click: () => app.quit(),
      },
    ]
    trayContextMenu = Menu.buildFromTemplate(trayMenuTemplate)
    appTray = new Tray(join(__dirname, './../../static/app-icon.png'))
    appTray.setToolTip('Bartender')
    appTray.setContextMenu(trayContextMenu)

    appTray.on('click', () => {
      if (appCurrentWindowId) {
        const currentWindow = BrowserWindow.fromId(appCurrentWindowId)
        return currentWindow.isVisible() ? currentWindow.hide() : currentWindow.show()
      }
    })
  })
}

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 768,
    width: 1024,
    frame: false,
    // titleBarStyle: 'hidden',
    minHeight: 600,
    minWidth: 800,
    show: false,
    webPreferences: {
      preload: join(__static, 'preload.js'),
      contextIsolation: false,
      nodeIntegration: false,
    },
  })
  appCurrentWindowId = mainWindow.id

  mainWindow.loadURL(__windowUrls.index)

  mainWindow.on('ready-to-show', function () {
    mainWindow.show()
  })

  mainWindow.on('maximize', function () {
    mainWindow.webContents.send('updateWindowStatus', { isMaximized: true })
  })

  mainWindow.on('unmaximize', function () {
    mainWindow.webContents.send('updateWindowStatus', { isMaximized: false })
  })

  mainWindow.on('blur', function () {
    mainWindow.webContents.send('updateWindowStatus', { isFocus: false })
  })

  mainWindow.on('focus', function () {
    mainWindow.webContents.send('updateWindowStatus', { isFocus: true })
  })

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.setZoomFactor(1)
    mainWindow.webContents.setVisualZoomLevelLimits(1, 1)
    // mainWindow.webContents.setLayoutZoomLevelLimits(0, 0)
  })

  ipcMain.on('renderer2main', (event, func) => {
    console.log(`ipcMain: renderer2main - ${func}`)
    switch (func) {
      case 'window-min':
        mainWindow.minimize()
        break
      case 'window-max':
        if (mainWindow.isMaximized()) {
          mainWindow.unmaximize()
        } else {
          mainWindow.maximize()
        }
        break
      case 'reload':
        mainWindow.reload()
        break
      case 'app-exit':
        mainWindow.hide()
        break
      default:
    }
  })
}

// ensure app start as single instance
if (!app.requestSingleInstanceLock()) {
  app.quit()
}
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

process.nextTick(main)
