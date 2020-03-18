'use strict'
import 'core-js'
import Config from './main-process/modules/config'
import App from './main-process/modules/app'
import Control from './main-process/control'
import Tray from './main-process/modules/tray'
const config = new Config()
const appManager = new App()
const tray = new Tray()
var control = {}
config.event.on('loaded', () => {
  console.log('app $config loaded')
  // console.log(global.$config)
  control = new Control()
  // 加载app
  appManager.loadApps()
  // 加载图标
  tray.createTray()
})


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
