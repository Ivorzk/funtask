'use strict'

import {
  app,
  BrowserWindow
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
    x: 100,
    y: 100,
    width: 600,
    height: 300,
    frame: false,
    transparent: true,
    resizable: false,
    maximizable: false,
    minimizable: false,
    alwaysOnTop: true,
    fullscreenable: false,
    hasShadow: false,
    skipTaskbar: true,
    opacity: 0
  })

  menuwin.on('close', () => {
    menuwin = null
  })

  menuwin.loadURL(`${winURL}/#/control`)

  // 小球和菜单联动
  ballwin.on('move', (evt) => {
    // TODO:
    let pos = ballwin.getPosition()
    let menuBounds = menuwin.getBounds()
    menuwin.setPosition(pos[0] - menuBounds.width, pos[1] - menuBounds.height)
  })
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
