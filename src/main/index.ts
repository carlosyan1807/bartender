import { app, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import './dialog'
import { Logger } from './logger'
import { initialize } from './services'

async function main() {
  const logger = new Logger()
  logger.initialize(app.getPath('userData'))
  initialize(logger)
  app.whenReady().then(() => {
    createWindow()
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

  mainWindow.loadURL(__windowUrls.index)

  mainWindow.on('ready-to-show', function () {
    mainWindow.show()
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
        mainWindow.close()
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
