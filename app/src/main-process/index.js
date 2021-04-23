'use strict'
import 'core-js'
import './modules/updater'
import Config from './modules/config'
import App from './modules/app'
import Control from './control'
import Tray from './modules/tray'
import System from './modules/system'
import Notice from './modules/notice'
import {
  app
} from 'electron'
// 获取应用锁
const gotTheLock = app.requestSingleInstanceLock()
const config = new Config()
const appManager = new App()
const tray = new Tray()
const system = new System()
let notice = {}
let control = {}

config.event.on('loaded', () => {
  console.log('app $config loaded')
  // 判断应用是否在运行
  if (!gotTheLock) {
    app.quit()
    return
  }
  // console.log(global.$config)
  control = new Control()
  // 初始化通知
  notice = new Notice()
  // 加载app
  appManager.loadApps()
  // 加载图标
  tray.createTray()
})
config.event.on('change', () => {
  console.log('config change')
  // 加载app
  appManager.loadApps()
})
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
