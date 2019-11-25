import {
  app,
  BrowserWindow,
  ipcMain
} from 'electron'

/**
 * 控制台
 */
class Control {
  // 小球
  ballwin
  // 菜单窗口
  controlwin
  // 入口页面
  winURL = process.env.NODE_ENV === 'development' ? `http://localhost:9080` : `file://${__dirname}/index.html`
  // 构造函数
  constructor() {
    app.on('ready', this.createWindow)

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })

    app.on('activate', () => {
      if (this.ballwin === null) {
        this.createWindow()
      }
    })

    // 监听菜单状态改变
    ipcMain.on('control-toggle', (evt, args) => {
      // 切换窗体类型
      let wintype = this.controlwin.getOpacity() === 0 ? 'control' : 'ball'
      // 同步菜单位置
      this.syncPosition(wintype)
      this.ballwin.webContents.send('control-reply', wintype === 'ball')
      this.controlwin.webContents.send('control-reply', wintype === 'control')
      // 设置显示和隐藏 间隔300毫秒，等待动画执行完成
      if (wintype === 'control') {
        this.controlwin.setOpacity(wintype === 'control' ? 1 : 0)
        setTimeout(() => {
          this.ballwin.setOpacity(wintype === 'ball' ? 1 : 0)
        }, 300)
      } else {
        this.ballwin.setOpacity(wintype === 'ball' ? 1 : 0)
        setTimeout(() => {
          this.controlwin.setOpacity(wintype === 'control' ? 1 : 0)
        }, 300)
      }
    })
  }

  // 创建窗体
  createWindow() {
    /**
     * Initial window options
     */
    this.ballwin = new BrowserWindow({
      width: 88,
      height: 88,
      frame: false,
      transparent: true,
      resizable: false,
      maximizable: false,
      minimizable: false,
      alwaysOnTop: true,
      fullscreenable: false,
      hasShadow: false,
      useContentSize: true,
      skipTaskbar: true,
      webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInWorker: true
      }
    })

    this.ballwin.loadURL(this.winURL)

    this.ballwin.on('closed', () => {
      this.ballwin = null
    })

    // 初始化菜单
    this.controlwin = new BrowserWindow({
      x: 0,
      y: 0,
      width: 618,
      height: 380,
      frame: false,
      transparent: true,
      resizable: false,
      maximizable: false,
      minimizable: false,
      alwaysOnTop: true,
      fullscreenable: false,
      hasShadow: true,
      skipTaskbar: true,
      opacity: 0,
      webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInWorker: true
      }
    })

    this.controlwin.loadURL(`${this.winURL}/#/control`)

    this.controlwin.on('closed', () => {
      this.controlwin = null
    })
  }

  // 同步菜单位置
  syncPosition(flag) {
    // console.log(flag, 'flag')
    // 小球位置
    let ballpos = this.ballwin.getPosition()
    // 窗体位置
    let controlpos = this.controlwin.getPosition()
    let controlBounds = this.controlwin.getBounds()
    if (flag === 'control') {
      this.controlwin.setPosition(ballpos[0] - controlBounds.width + 75, ballpos[1] - controlBounds.height + 75)
    } else {
      this.ballwin.setPosition(controlpos[0] + controlBounds.width - 75, controlpos[1] + controlBounds.height - 75)
    }
  }
}

export default new Control()
