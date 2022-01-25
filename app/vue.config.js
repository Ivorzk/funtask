const path = require('path')
module.exports = {
  lintOnSave: false,
  pluginOptions: {
    electronBuilder: {
      customFileProtocol: 'funtask://./', // Make sure to add "./" to the end of the protocol
      // 打包配置
      builderOptions: {
        copyright: '©2017-2022 SUWIS, co. LTD All rights reserved.',
        appId: 'com.suwis.funtask.app',
        publish: [],
        win: {
          target: [{
            'target': 'msi',
            // 'arch': [
            //   'x64'
            // ]
          }]
        },
        nsis: {
          oneClick: false, // 一键安装
          // perMachine: false, // 一个用户一个安装程序还是全局安装
          allowElevation: true, // 权限提升
          allowToChangeInstallationDirectory: true, //是否允许用户更改安装目录
        },
        mac: {
          target: [{
            'target': 'dmg'
          }],
          entitlements: 'build/entitlements.mac.plist',
          entitlementsInherit: 'build/entitlements.mac.plist'
        },
        appx: {
          applicationId: '',
          backgroundColor: '#fff',
          identityName: 'Funtask',
          publisher: 'suwis',
          languages: 'cn-ZH'
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
  },
  chainWebpack: config => {
    config.externals = {
      worker_threads: 'commonjs worker_threads'
    }
  }
}
