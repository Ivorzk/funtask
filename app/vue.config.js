const path = require('path')
module.exports = {
  pluginOptions: {
    electronBuilder: {
      customFileProtocol: 'funtask://./', // Make sure to add "./" to the end of the protocol
      // 打包配置
      builderOptions: {
        copyright: 'Copyright © suwis'
      },
      mainProcessFile: 'src/main-process',
      mainProcessWatch: ['main-process/**/*']
    },
    'style-resources-loader': {
      'preProcessor': 'scss',
      'patterns': [
        path.resolve(__dirname, './src/styles/*.scss')
      ]
    }
  }
}
