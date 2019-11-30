'use strict'
import Config from './main-process/config'
import AppManager from './main-process/appManager'
import Control from './main-process/control'
import Tray from './main-process/tray'
const config = new Config()
const appManager = new AppManager()
const control = new Control()
const tray = new Tray()
config.event.on('loaded', () => {
  console.log('app $config loaded')
  // - 
  control
  // 加载app
  appManager.loadApps()
  // 加载图标
  tray.createTray()
})
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
