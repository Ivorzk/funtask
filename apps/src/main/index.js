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
let menuwin

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
  menuwin = new BrowserWindow({
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

  menuwin.on('close', () => {
    menuwin = null
  })

  menuwin.loadURL(`${winURL}/#/control`)

  // 小球和菜单联动
  ballwin.on('move', syncMenuPosition)
}

// 同步菜单位置
function syncMenuPosition() {
  let pos = ballwin.getPosition()
  let menuBounds = menuwin.getBounds()
  menuwin.setPosition(pos[0] - menuBounds.width, pos[1] - menuBounds.height)
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
ipcMain.on('menu-toggle', (evt, args) => {
  console.log(evt, args)
  // 同步菜单位置
  syncMenuPosition()
  // 设置显示和隐藏
  menuwin.setOpacity(menuwin.getOpacity() === 0 ? 1 : 0)
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
