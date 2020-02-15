module.exports = {
  pluginOptions: {
    electronBuilder: {
      customFileProtocol: 'funtask://./', // Make sure to add "./" to the end of the protocol
      // 打包配置
      builderOptions: {
        copyright: 'Copyright © suwis'
      }
    }
  }
}
