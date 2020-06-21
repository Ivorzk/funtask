import {
  ipcMain,
  BrowserWindow,
  screen,
  app
} from 'electron'
let win
// 消息队列
let queues = new Map()
import _ from 'lodash'
// 当前消息是否显示
let display = false
export default class {
  constructor() {
    // 监听客户端发送过来的通知
    ipcMain.on('notice-send', async (evt, data) => {
      queues.set(`notice_${Date.now()}`, {
        evt,
        data
      })
      // 发送数据
      if (!display) this.send(data)
      // 设置缓存
      this.setCatch()
    })
    // 监听消息框发送过来的点击事件
    ipcMain.on('notice-close', async (evt, key) => {
      win.hide()
      // 如果是用户点击的通知，则通知客户端
      let notice = queues.get(key)
      if (notice) {
        notice.evt.reply('notice-click-reply', notice.data)
        // 从队列中删除
        queues.delete(key)
      }
      display = false
    })
    // 移除
    ipcMain.on('notice-remove', async (evt, data) => {
      // 从队列中删除]
      queues.delete(data.key)
      evt.evt.reply('notice-remove-reply', true)
    })
    // 获取通知消息列表
    ipcMain.on('notice-get-list', async (evt, data) => {
      let list = []
      for (let [key, value] of queues) {
        list.push({
          key: key,
          ...value
        })
      }
      evt.reply('notice-get-list-reply', list)
    })
    // 调用初始化窗口方法
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

  // 加载缓存数据
  getCache() {

  }

  // 设置缓存
  setCatch() {
    console.log('设置缓存')
  }

  // 发送通知
  async send(data) {
    display = true
    win.show()
    win.webContents.send('notice-push-reply', data)
    return true
  }
}
