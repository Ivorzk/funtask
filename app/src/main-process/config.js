import YAML from 'yaml'
import path from 'path'
import os from 'os'
import fs from 'fs'
import gulp from 'gulp'
import rename from 'gulp-rename'
export default class {
  constructor() {
    // 加载配置文件
    this.loadConfig()
  }

  // 获取配置文件目录
  get configdir() {
    return path.resolve(os.homedir() + '/.funtask')
  }

  // 检查配置文件是否存在
  async getConfigFile() {
    let file = ''
    try {
      file = fs.readFileSync(`${this.configdir}/config.yaml`, 'utf8')
    } catch (e) {
      // 复制默认配置文件至配置目录
      gulp.src(`${__static}/default-config.yaml`)
        .pipe(rename('config.yaml'))
        .pipe(gulp.dest(this.configdir))
      // 读取默认配置文件
      file = fs.readFileSync(`${__static}/default-config.yaml`, 'utf8')
    }
    return file
  }

  // 载入配置文件
  async loadConfig() {
    // 尝试读取配置文件
    let file = await this.getConfigFile()
    // 解析配置文件并注入到全局变量中
    global.$config = YAML.parse(file)
    // 开始监听文件改变
    this.watchConfigFile()
  }

  // 监听配置文件
  watchConfigFile() {
    gulp.watch(`${this.configdir}/config.yaml`, (event) => {
      // 重新加载配置文件
      this.loadConfig()
    })
  }
}
