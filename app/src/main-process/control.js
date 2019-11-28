'use strict'
import {
  app,
  protocol,
  BrowserWindow,
  ipcMain
} from 'electron'
import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{
  scheme: 'app',
  privileges: {
    secure: true,
    standard: true
  }
}])
/**
 * 控制台
 */
export default class {
  // 小球
  ballwin = {}
  // 菜单窗口
  controlwin = {}
  // 构造函数
  constructor() {
    app.on('ready', () => {
      if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        // Devtools extensions are broken in Electron 6.0.0 and greater
        // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
        // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
        // If you are not using Windows 10 dark mode, you may uncomment these lines
        // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
        // try {
        //   await installVueDevtools()
        // } catch (e) {
        //   console.error('Vue Devtools failed to install:', e.toString())
        // }
      }
      this.createWindow()
    })

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

    this.controlwin.on('closed', () => {
      this.controlwin = null
    })

    if (process.env.WEBPACK_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
      this.ballwin.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
      this.controlwin.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}/control`)
      if (!process.env.IS_TEST) this.ballwin.webContents.openDevTools()
    } else {
      createProtocol('app')
      // Load the index.html when not in development
      this.ballwin.loadURL('app://./index.html')
      this.controlwin.loadURL(`app://./index.html/control`)
    }
  }

  // 同步菜单位置
  syncPosition(flag) {
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
