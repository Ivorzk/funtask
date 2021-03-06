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


// 遍历app信息
var eachAppInfo = function(dirs) {
  return new Promise((resolve, reject) => {
    let apps = []
    dirs.forEach(apppath => {
      try {
        var packageFile = fs.readFileSync(path.resolve(apppath + '/package.json'), 'utf-8')
        if (packageFile) {
          apps.push({
            package: JSON.parse(packageFile),
            path: apppath
          })
        }
      } catch (e) {}
    })
    resolve(apps)
  })
}

// export
const instance = new class {
  // 链接
  link(name) {
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
    // console.log(YAML.stringify(configJson))
    fs.writeFileSync(path.resolve(apphome + '/config.yaml'), YAML.stringify(configJson))

    this.sendmsg('link', name)

    console.log(chalk.yellow('Application register successfully !'))
  }

  // 取消链接
  async unlink(name) {
    // 如果不存在name参数,则尝试获取当前执行目录下是否有package.json
    let pkg = {}
    if (!name) {
      let data = fs.readFileSync(path.resolve(process.cwd() + '/package.json'), 'utf-8')
      if (data) pkg = JSON.parse(data)
    }
    options.name = name || pkg.name
    // 读取配置文件
    var configFile = fs.readFileSync(path.resolve(apphome + '/config.yaml'), 'utf-8')
    // 设置将app禁用
    var configJson = YAML.parse(configFile)
    // 初始化app
    configJson.dev.debugdirs ? '' : configJson.dev.debugdirs = []
    // 过滤非法目录
    let apps = await eachAppInfo(configJson.dev.debugdirs)
    for (let app of apps) {
      if (options.name == app.package.name) {
        let idx = configJson.dev.debugdirs.indexOf(path.resolve(app.path))
        configJson.dev.debugdirs.splice(idx, 1)
        break
      }
    }
    // 写入本地磁盘
    // console.log(YAML.stringify(configJson))
    fs.writeFileSync(path.resolve(apphome + '/config.yaml'), YAML.stringify(configJson))

    this.sendmsg('unlink', options.name)

    console.log(chalk.yellow(`${options.name} unlkin successfully !`))
  }

  // 向客户端发送调试信息
  sendmsg(type, data) {
    // TODO: 通讯机制待实现
  }
}

module.exports = instance
