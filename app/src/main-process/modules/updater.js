import {
  AppImageUpdater,
  MacUpdater,
  NsisUpdater
} from 'electron-updater'
import {
  dialog
} from 'electron'
let autoUpdater = {}
const updateOptions = {
  mac: {
    requestHeaders: {
      // Any request headers to include here
      Authorization: 'Basic AUTH_CREDS_VALUE'
    },
    provider: 'generic',
    url: 'https://www.fastmock.site/mock/50761298e0ca033cb496bb8668a09943/funtask/releases'
  },
  windows: {
    requestHeaders: {
      // Any request headers to include here
      Authorization: 'Basic AUTH_CREDS_VALUE'
    },
    provider: 'generic',
    url: 'https://www.fastmock.site/mock/50761298e0ca033cb496bb8668a09943/funtask/releases'
  },
  linux: {
    requestHeaders: {
      // Any request headers to include here
      Authorization: 'Basic AUTH_CREDS_VALUE'
    },
    provider: 'generic',
    url: 'https://www.fastmock.site/mock/50761298e0ca033cb496bb8668a09943/funtask/releases'
  }
}
export default new class {
  constructor() {
    this.init()
  }

  init() {
    if (process.platform === 'win32') {
      autoUpdater = new NsisUpdater(updateOptions.windows)
    } else if (process.platform === 'darwin') {
      autoUpdater = new MacUpdater(updateOptions.mac)
    } else {
      autoUpdater = new AppImageUpdater(updateOptions.linux)
    }
    setTimeout(() => {
      dialog.showMessageBoxSync({
        message: '开始运行更新程序'
      })
    }, 1000)
    autoUpdater.checkForUpdatesAndNotify()

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
