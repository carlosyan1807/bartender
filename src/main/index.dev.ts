import { app, session } from 'electron'

global.__static = require('path').join(__dirname, '../../static').replace(/\\\\/g, '\\\\\\\\')
global.__windowUrls = new Proxy(
  {},
  {
    get(_, page) {
      return `http://localhost:8080/${page.toString()}.html`
    },
  }
)
app.whenReady().then(async () => {
  try {
    await session.defaultSession.loadExtension(
      app.getPath('home') + '\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\ljjemllljcmogpfapbkkighbhhppjdbg\\6.0.0.2_0'
    )
  } catch (e) {
    console.error('Vue Devtools failed to install:', e.toString())
  }
})
app.on('browser-window-created', (event, window) => {
  if (!window.webContents.isDevToolsOpened()) {
    window.webContents.openDevTools()
  }
})

// eslint-disable-next-line import/first
import './index'
