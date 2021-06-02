import {
  autoUpdater
} from 'electron'

export default new class {
  constructor() {
    // 判断是否是生产环境
    if (!process.env.WEBPACK_DEV_SERVER_URL) this.checkForUpdate()
  }

  checkForUpdate() {
    console.log($config, 'autoUpdater ')
    autoUpdater.setFeedURL($config.apihost + '/funtask/releases')
  }
}
