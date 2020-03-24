'use strict'
import 'core-js'
import Config from './modules/config'
import App from './modules/app'
import Control from './control'
import Tray from './modules/tray'
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
config.event.on('loaded', () => {
  console.log('config change------------------')
  // 加载app
  appManager.loadApps()
})
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
