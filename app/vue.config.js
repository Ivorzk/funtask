const path = require('path')
console.log('path', path)
module.exports = {
  lintOnSave: false,
  pluginOptions: {
    electronBuilder: {
      customFileProtocol: 'funtask://./', // Make sure to add "./" to the end of the protocol
      // 打包配置
      builderOptions: {
        copyright: '©2017-2021 SUWIS, co. LTD All rights reserved.',
        appId: 'com.suwis.funtask.app',
        publish: [{
          provider: 'github',
          owner: 'Ivorzk',
          host: 'github.com',
          protocol: 'https',
          publishAutoUpdate: true,
          token: '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',
          vPrefixedTagName: true
        }],
        nsis: {
          oneClick: false, // 一键安装
          // perMachine: false, // 一个用户一个安装程序还是全局安装
          allowElevation: true, // 权限提升
          allowToChangeInstallationDirectory: true, //是否允许用户更改安装目录
        },
        mac: {
          entitlements: 'build/entitlements.mac.plist',
          entitlementsInherit: 'build/entitlements.mac.plist'
        }
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
      default: 'dev',
      includePackage: true
    }
  }
}
