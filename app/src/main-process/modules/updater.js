import {
  autoUpdater,
  dialog
} from 'electron'

export default new class {
  constructor() {
    // 设置更新地址
    autoUpdater.setFeedURL('http://127.0.0.1:8360/funtask/releases')
    // 监听事件
    autoUpdater.on('checking-for-update', () => {
      console.log('checking-for-update')
    })
    autoUpdater.on('update-available', () => {
      console.log('update-available')
    })
    autoUpdater.on('update-not-available', () => {
      dialog.showMessageBox({
        title: '有更新'
      })
      console.log('update-not-available')
    })
    autoUpdater.on('update-downloaded', () => {
      console.log('update-downloaded')
    })
    autoUpdater.on('before-quit-for-update', () => {
      console.log('before-quit-for-update')
    })
    // 判断是否是生产环境
    // if (!process.env.WEBPACK_DEV_SERVER_URL)

    this.checkForUpdate()
  }

  checkForUpdate() {
    // console.log($config, 'autoUpdater ')
    // autoUpdater.setFeedURL($config.apihost + '/funtask/releases')
    autoUpdater.checkForUpdates()
  }
}
