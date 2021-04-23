/**
 * 控制台类
 */
'use strict'
import {
  app,
  protocol,
  BrowserWindow,
  ipcMain,
  screen
} from 'electron'
import customProtocol from './modules/protocol'
const isDevelopment = process.env.NODE_ENV !== 'production'
// Scheme must be registered before the app is ready
app.allowRendererProcessReuse = true
app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors')
// 注册标准协议
protocol.registerSchemesAsPrivileged([{
  scheme: 'funtask',
  privileges: {
    secure: false,
    standard: true,
    bypassCSP: false
  }
}])

/**
 * 控制台
 */
export default class {
  // 构造函数
  constructor() {
    // 小球
    this.ball = {}
    // 菜单窗口
    this.control = {}
    // 最后一次显示的窗口
    this.lastVisibleWindow = {}
    // 监听第二个实例
    app.on('second-instance', (event, commandLine, workingDirectory) => {
      if (!this.lastVisibleWindow.id) return
      // 切换悬浮球
      if (this.lastVisibleWindow.getOpacity() !== 1) {
        ipcMain.emit('ball-toggle')
      } else {
        this.lastVisibleWindow.focus()
      }
    })

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })

    app.on('activate', () => {
      if (this.ball === null) {
        this.createWindow()
      }
    })

    // Exit cleanly on request from parent process in development mode.
    if (isDevelopment) {
      if (process.platform === 'win32') {
        process.on('message', data => {
          if (data === 'graceful-exit') {
            app.quit()
          }
        })
      } else {
        process.on('SIGTERM', () => {
          app.quit()
        })
      }
    }

    // 监听菜单状态改变
    ipcMain.on('control-toggle', (evt, args) => {
      // 切换窗体类型
      const wintype = this.control.getOpacity() === 0 ? 'control' : 'ball'
      // 记录最后一次显示的窗口
      this.lastVisibleWindow = this[wintype]
      // 同步菜单位置
      this.syncPosition(wintype)
      this.ball.webContents.send('control-reply', wintype === 'ball')
      this.control.webContents.send('control-reply', wintype === 'control')
      // 设置显示和隐藏 间隔300毫秒，等待动画执行完成
      if (wintype === 'control') {
        this.control.setAlwaysOnTop(true)
        this.control.setOpacity(wintype === 'control' ? 1 : 0)
        setTimeout(() => {
          this.ball.setOpacity(wintype === 'ball' ? 1 : 0)
        }, 300)
      } else {
        this.ball.setAlwaysOnTop(true)
        this.ball.setOpacity(wintype === 'ball' ? 1 : 0)
        setTimeout(() => {
          this.control.setOpacity(wintype === 'control' ? 1 : 0)
        }, 300)
      }
    })

    // 小球切换
    ipcMain.on('ball-toggle', () => {
      if (!this.lastVisibleWindow.id) return
      const isVisible = this.lastVisibleWindow.getOpacity() === 1
      if (isVisible) {
        setTimeout(() => {
          this.lastVisibleWindow.setOpacity(0)
        }, 300)
      } else {
        this.lastVisibleWindow.setAlwaysOnTop(true)
        this.lastVisibleWindow.setOpacity(1)
      }
      this.lastVisibleWindow.webContents.send('toggle', !isVisible)
    })

    // 监听窗口刷新操作
    ipcMain.on('dev-update', (evt, data) => {
      this.control.webContents.send('dev-update', data)
    })

    // 创建窗体
    this.createWindow()
  }

  // 创建窗体
  createWindow() {
    console.log('创建窗体')
    // 获取宽高
    const {
      width,
      height
    } = screen.getPrimaryDisplay().workAreaSize
    /**
     * Initial window options
     */
    this.ball = new BrowserWindow({
      x: width - 108,
      y: height - 108,
      width: 88,
      height: 88,
      frame: false,
      transparent: true,
      backgroundColor: '#00ffffff',
      resizable: false,
      maximizable: false,
      minimizable: false,
      alwaysOnTop: global.$config.app.window.alwaysOnTop,
      fullscreenable: false,
      hasShadow: false,
      useContentSize: true,
      skipTaskbar: true,
      webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInWorker: true,
        webSecurity: false,
        enableRemoteModule: true,
        contextIsolation: false
      }
    })
    // 初始赋值最后一次显示的窗口
    this.lastVisibleWindow = this.ball

    this.ball.on('closed', () => {
      this.ball = null
    })

    // 初始化菜单
    this.control = new BrowserWindow({
      x: 0,
      y: 0,
      width: 618,
      height: 380,
      frame: false,
      transparent: true,
      backgroundColor: '#00ffffff',
      resizable: false,
      maximizable: false,
      minimizable: false,
      alwaysOnTop: global.$config.app.window.alwaysOnTop,
      fullscreenable: false,
      hasShadow: true,
      skipTaskbar: true,
      opacity: 0,
      webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInWorker: true,
        webSecurity: false,
        contextIsolation: false
      }
    })

    this.control.on('closed', () => {
      this.control = null
    })
    // 创建协议(主框架工作目录)
    // createProtocol(global.$config.app.protocol)
    // 注册协议
    customProtocol.register(global.$config.app.protocol)
    // 创建app目录协议
    if (process.env.WEBPACK_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
      this.ball.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
      this.control.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}#/funlist`)
      if (!process.env.IS_TEST) this.control.webContents.openDevTools()
    } else {
      // Load the index.html when not in development
      this.ball.loadURL(`${global.$config.app.protocol}://./index.html`)
      this.control.loadURL(`${global.$config.app.protocol}://./index.html#/funlist`)
    }
    // this.control.webContents.executeJavaScript(`window.funtask = require('@suwis/funtask/core/index.js')`)
  }

  // 同步菜单位置
  syncPosition(flag) {
    // 小球位置
    const ballpos = this.ball.getPosition()
    // 窗体位置
    const controlpos = this.control.getPosition()
    const controlBounds = this.control.getBounds()
    if (flag === 'control') {
      this.control.setPosition(ballpos[0] - controlBounds.width + 75, ballpos[1] - controlBounds.height + 75)
    } else {
      this.ball.setPosition(controlpos[0] + controlBounds.width - 75, controlpos[1] + controlBounds.height - 75)
    }
  }
}
