const path = require('path')
const chalk = require('chalk')
const os = require('os')
const fs = require('fs')
const YAML = require('yaml')
// tasker
// 获取配置文件目录
const apphome = path.resolve(os.homedir() + '/.funtask')
// options
const options = {}
// export
module.exports = {
  // 链接
  link: (name) => {
    // init options
    options.name = name
    // 读取配置文件
    var configFile = fs.readFileSync(path.resolve(apphome + '/config.yaml'), 'utf-8')
    // 设置将app禁用
    var configJson = YAML.parse(configFile)
    // 初始化app
    configJson.dev.debugdirs ? '' : configJson.dev.debugdirs = []
    // 将app目录加
    if (configJson.dev.debugdirs.indexOf(process.cwd()) == -1) {
      configJson.dev.debugdirs.push(process.cwd())
    }
    // 写入本地磁盘
    console.log(YAML.stringify(configJson))
    fs.writeFileSync(path.resolve(apphome + '/config.yaml'), YAML.stringify(configJson))

    console.log(chalk.yellow('Application register successfully !'))
  },
  // 取消链接
  unlink: (name) => {
    // init options
    options.name = name
    // 读取配置文件
    var configFile = fs.readFileSync(path.resolve(apphome + '/config.yaml'), 'utf-8')
    // 设置将app禁用
    var configJson = YAML.parse(configFile)
    // 初始化app
    configJson.dev.debugdirs ? '' : configJson.dev.debugdirs = []
    for (let idx in configJson.dev.debugdirs) {
      let dir = configJson.dev.debugdirs[idx]
      if (dir.indexOf(name) > -1) {
        configJson.dev.debugdirs.splice(idx, 1)
        break
      }
    }
    // 写入本地磁盘
    console.log(YAML.stringify(configJson))
    fs.writeFileSync(path.resolve(apphome + '/config.yaml'), YAML.stringify(configJson))

    console.log(chalk.yellow(`${name} unlkin successfully !`))
  }
}
