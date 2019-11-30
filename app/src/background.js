'use strict'
import Config from './main-process/config'
import AppManager from './main-process/appManager'
import Control from './main-process/control'
const config = new Config()
const appManager = new AppManager()
const control = new Control()
config.event.on('loaded', () => {
  console.log('配置文件加载完毕')
  control
  // 加载app
  appManager.loadApps()
})
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
