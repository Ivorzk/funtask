'use strict'

import {
  app,
  BrowserWindow,
  ipcMain
} from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

// 小球
let ballwin
// 菜单窗口
let controlwin

// 入口页面
const winURL = process.env.NODE_ENV === 'development' ? `http://localhost:9080` : `file://${__dirname}/index.html`

// 创建窗体
function createWindow() {
  /**
   * Initial window options
   */
  ballwin = new BrowserWindow({
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
    skipTaskbar: true
  })

  ballwin.loadURL(winURL)

  ballwin.on('closed', () => {
    ballwin = null
  })

  // 初始化菜单
  controlwin = new BrowserWindow({
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
    opacity: 0
  })

  controlwin.on('close', () => {
    controlwin = null
  })

  controlwin.loadURL(`${winURL}/#/control`)
}

// 同步菜单位置
function syncPosition(flag) {
  // console.log(flag, 'flag')
  // 小球位置
  let ballpos = ballwin.getPosition()
  // 窗体位置
  let controlpos = controlwin.getPosition()
  let controlBounds = controlwin.getBounds()
  if (flag === 'control') {
    controlwin.setPosition(ballpos[0] - controlBounds.width + 75, ballpos[1] - controlBounds.height + 75)
  } else {
    ballwin.setPosition(controlpos[0] + controlBounds.width - 75, controlpos[1] + controlBounds.height - 75)
  }
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (ballwin === null) {
    createWindow()
  }
})

// 监听菜单状态改变
ipcMain.on('control-toggle', (evt, args) => {
  console.log(evt.sender.webContents.id, 'evt')
  // 切换窗体类型
  let wintype = controlwin.getOpacity() === 0 ? 'control' : 'ball'
  // 同步菜单位置
  syncPosition(wintype)
  // 设置显示和隐藏 间隔300毫秒，等待动画执行完成
  if (wintype === 'control') {
    controlwin.setOpacity(wintype === 'control' ? 1 : 0)
    setTimeout(() => {
      ballwin.setOpacity(wintype === 'ball' ? 1 : 0)
    }, 300)
  } else {
    ballwin.setOpacity(wintype === 'ball' ? 1 : 0)
    setTimeout(() => {
      controlwin.setOpacity(wintype === 'control' ? 1 : 0)
    }, 300)
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
