import {
  ipcMain,
  BrowserWindow,
  screen,
  app
} from 'electron'
let win
// 缓存通知内容
let custom = {
  evt: {},
  data: {}
}
export default class {
  constructor() {
    ipcMain.on('notice-send', async (evt, data) => {
      let res = await this.send(data)
      evt.reply('notice-send-reply', res)
      custom.evt = evt
      custom.data = data
    })
    ipcMain.on('notice-close', async (evt, type) => {
      win.hide()
      // 如果是用户点击的通知，则通知客户端
      if (type === 'custom') custom.evt.reply('notice-click-reply', custom.data)
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
      width: 398,
      height: 128,
      frame: false,
      x: width - 398,
      y: height - 128,
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
      win.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}#/notice`)
    } else {
      win.loadURL(`${global.$config.app.protocol}://./index.html#/notice`)
    }
    win.hide()
  }

  // 发送通知
  async send(data) {
    win.show()
    win.webContents.send('notice-push-reply', data)
    return true
  }
}
