import {
  AppImageUpdater,
  MacUpdater,
  NsisUpdater
} from 'electron-updater'
let autoUpdater = {}
const updateOptions = {
  mac: {
    requestHeaders: {
      // Any request headers to include here
      Authorization: 'Basic AUTH_CREDS_VALUE'
    },
    provider: 'github',
    url: 'https://example.com/auto-updates'
  },
  windows: {
    requestHeaders: {
      // Any request headers to include here
      Authorization: 'Basic AUTH_CREDS_VALUE'
    },
    provider: 'github',
    url: 'https://example.com/auto-updates'
  },
  linux: {
    requestHeaders: {
      // Any request headers to include here
      Authorization: 'Basic AUTH_CREDS_VALUE'
    },
    provider: 'github',
    url: 'https://example.com/auto-updates'
  }
}
export default new class {
  constructor() {
    if (process.platform === 'win32') {
      autoUpdater = new NsisUpdater(updateOptions.windows)
    } else if (process.platform === 'darwin') {
      autoUpdater = new MacUpdater(updateOptions.mac)
    } else {
      autoUpdater = new AppImageUpdater(updateOptions.linux)
    }
    autoUpdater.checkForUpdatesAndNotify()

    autoUpdater.on('checking-for-update', () => {
      sendStatusToWindow('Checking for update...')
    })
    autoUpdater.on('update-available', (info) => {
      sendStatusToWindow('Update available.')
    })
    autoUpdater.on('update-not-available', (info) => {
      sendStatusToWindow('Update not available.')
    })
    autoUpdater.on('error', (err) => {
      sendStatusToWindow('Error in auto-updater. ' + err)
    })
    autoUpdater.on('download-progress', (progressObj) => {
      let log_message = "Download speed: " + progressObj.bytesPerSecond
      log_message = log_message + ' - Downloaded ' + progressObj.percent + '%'
      log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')'
      sendStatusToWindow(log_message)
    })
    autoUpdater.on('update-downloaded', (info) => {
      sendStatusToWindow('Update downloaded')
    })
  }
}
