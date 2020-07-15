// 判断是否是生产环境
if (!process.env.WEBPACK_DEV_SERVER_URL) {
  require('update-electron-app')({
    repo: 'https://github.com/Ivorzk/funtask',
    updateInterval: '3 hour',
    logger: require('electron-log')
  })
}
