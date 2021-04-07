const path = require('path')
console.log('path', path)
module.exports = {
  lintOnSave: false,
  pluginOptions: {
    electronBuilder: {
      customFileProtocol: 'funtask://./', // Make sure to add "./" to the end of the protocol
      // 打包配置
      builderOptions: {
        copyright: '©2017-2020 Suwis, co. LTD All rights reserved.',
        publish: []
      },
      mainProcessFile: 'src/main-process',
      mainProcessWatch: ['main-process/**/*']
    },
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './src/styles/variables.scss')
      ]
    },
    // options
    'app-config': {
      file: './app.config.js',
      default: 'dev'
    }
  }
}
