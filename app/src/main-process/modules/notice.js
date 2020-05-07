import {
  ipcMain,
  BrowserWindow,
  screen,
  app
} from 'electron'
let win
export default class {
  constructor() {
    ipcMain.on('notice-send', async (evt, data) => {
      let res = await this.send(data)
      evt.reply('notice-send-reply', res)
    })
    app.on('ready', () => {
      this.init()
    })
  }

  async init() {
    // 获取宽高
    const {
      width,
      height
    } = screen.getPrimaryDisplay().workAreaSize

    win = new BrowserWindow({
      width: 520,
      height: 268,
      frame: false,
      x: width - 520,
      y: height - 268,
      hasShadow: false,
      transparent: true,
      resizable: false,
      maximizable: false,
      minimizable: false,
      alwaysOnTop: true,
      fullscreenable: false,
      skipTaskbar: true,
      webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInWorker: true,
        webSecurity: false
      }
    })
    if (process.env.WEBPACK_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
      win.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}#/notice`)
    } else {
      win.loadURL(`${global.$config.app.protocol}://./index.html#/notice`)
    }
    // win.hide()
  }

  // 发送通知
  async send(data) {
    win.show()
    setTimeout(() => {
      win.hide()
    }, 5000)
    return true
  }
}
