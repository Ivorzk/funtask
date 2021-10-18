import {
  AppImageUpdater,
  MacUpdater,
  NsisUpdater
} from 'electron-updater'
import {
  app
} from 'electron'
import os from 'os'
import countly from './countly'
import moment from 'moment'
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
      countly.$emit('system-updater-checking-for-update', {
        date: moment().format('YYYY-MM-DD HH:mm:ss')
      })
    })
    autoUpdater.on('update-available', (info) => {
      countly.$emit('system-updater-update-available', info)
    })
    autoUpdater.on('update-not-available', (info) => {
      countly.$emit('system-updater-update-not-available', {
        date: moment().format('YYYY-MM-DD HH:mm:ss')
      })
    })
    autoUpdater.on('error', (err) => {
      countly.$emit('system-updater-error', err)
    })
    autoUpdater.on('download-progress', (progressObj) => {
      let log_message = "Download speed: " + progressObj.bytesPerSecond
      log_message = log_message + ' - Downloaded ' + progressObj.percent + '%'
      log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')'
      countly.$emit('system-updater-download-progress', {
        progress: log_message
      })
    })
    autoUpdater.on('update-downloaded', (info) => {
      countly.$emit('system-updater-update-downloaded', info)
    })
  }
}
