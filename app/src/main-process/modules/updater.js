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
    provider: 'generic',
    url: 'https://example.com/auto-updates'
  },
  windows: {
    requestHeaders: {
      // Any request headers to include here
      Authorization: 'Basic AUTH_CREDS_VALUE'
    },
    provider: 'generic',
    url: 'https://example.com/auto-updates'
  },
  linux: {
    requestHeaders: {
      // Any request headers to include here
      Authorization: 'Basic AUTH_CREDS_VALUE'
    },
    provider: 'generic',
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
  }
}
