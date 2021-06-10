import {
  AppImageUpdater,
  MacUpdater,
  NsisUpdater
} from 'electron-updater'
import {
  dialog,
  app
} from 'electron'
import os from 'os'
let autoUpdater = {}
const host = 'https://upyfuntask.suwis.com/funtask/download'
const updateOptions = {
  mac: {
    provider: 'generic',
    url: `${host}/mac/${os.arch()}`
  },
  windows: {
    provider: 'generic',
    url: `${host}/windows/${os.arch()}`
  },
  linux: {
    provider: 'generic',
    url: `${host}/linux/${os.arch()}`
  }
}

export default new class {
  constructor() {
    app.on('ready', () => {
      this.init()
    })
  }

  // 初始化更新脚本
  init() {
    if (process.platform === 'win32') {
      autoUpdater = new NsisUpdater(updateOptions.windows)
    } else if (process.platform === 'darwin') {
      autoUpdater = new MacUpdater(updateOptions.mac)
    } else {
      autoUpdater = new AppImageUpdater(updateOptions.linux)
    }
    autoUpdater.checkForUpdatesAndNotify()

    // 系统检查更新
    autoUpdater.on('checking-for-update', () => {
      dialog.showMessageBoxSync({
        message: 'Checking for update...'
      })
    })
    autoUpdater.on('update-available', (info) => {
      dialog.showMessageBoxSync({
        message: 'Update available.'
      })
    })
    autoUpdater.on('update-not-available', (info) => {
      dialog.showMessageBoxSync({
        message: 'Update not available.'
      })
    })
    autoUpdater.on('error', (err) => {
      dialog.showMessageBoxSync({
        message: 'Error in auto-updater. ' + err
      })
    })
    autoUpdater.on('download-progress', (progressObj) => {
      let log_message = "Download speed: " + progressObj.bytesPerSecond
      log_message = log_message + ' - Downloaded ' + progressObj.percent + '%'
      log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')'
      dialog.showMessageBoxSync({
        message: log_message
      })
    })
    autoUpdater.on('update-downloaded', (info) => {
      dialog.showMessageBoxSync({
        message: 'Update downloaded'
      })
    })
  }
}
