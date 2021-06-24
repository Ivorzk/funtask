import {
  ipcMain,
  BrowserWindow,
  screen,
  app,
  shell
} from 'electron'
import _ from 'lodash'
let win
// 消息队列
const queues = new Map()
// 当前消息是否显示
let display = false
export default class {
  constructor() {
    // 设置客户端通知名称
    app.setAppUserModelId('Funtask')
    // 监听客户端发送过来的通知
    ipcMain.on('notice-send', async (evt, data) => {
      const key = `notice_${Date.now()}`
      data = {
        ...data,
        key
      }
      queues.set(key, {
        evt,
        data
      })
      // 发送数据
      if (!display) this.send(data)
      // 设置缓存
      this.setCatch()
    })
    // 监听消息框发送过来的点击事件
    ipcMain.on('notice-close', async (evt, item) => {
      win.hide()
      // 如果是用户点击的通知，则通知客户端
      const notice = queues.get(item.key)
      if (notice) {
        if (item.type == 'custom') this.runBehavior(notice.data)
        // todo: command 实现
        notice.evt.reply('notice-click-reply', notice.data)
        // 从队列中删除
        queues.delete(item.key)
      }
      display = false
    })
    // 获取通知消息列表
    ipcMain.on('notice-get-list', async (evt, data) => {
      const list = []
      for (const [key, value] of queues) {
        const item = value
        delete item.evt
        list.push(item)
      }
      evt.reply('notice-get-list-reply', list)
    })
    // 删除事件
    ipcMain.on('notice-remove', async (evt, item) => {
      win.hide()
      // 如果是用户点击的通知，则通知客户端
      const notice = queues.get(item.key)
      if (notice) {
        if (item.behavior) this.runBehavior(notice.data)
        notice.evt.reply('notice-remove-reply', notice.data)
        // 从队列中删除
        queues.delete(item.key)
      }
      display = false
    })
    // 调用初始化窗口方法
    this.init()
  }

  // 执行点击行为
  runBehavior(data) {
    console.log('data', data)
    // 判断是否有url
    if (data.url) {
      shell.openExternal(data.url)
    }
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
        webSecurity: false,
        enableRemoteModule: true,
        contextIsolation: false
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
