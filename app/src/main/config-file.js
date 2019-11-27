import YAML from 'yaml'
import path from 'path'
import os from 'os'
import fs from 'fs'
import defaultConfig from './../../static/default-config.yaml'
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
      console.log('文件读取异常')
      // 创建一个默认的配置文件
      console.log(defaultConfig, 'defaultConfig')
    }
    return file
  }

  // 载入配置文件
  async loadConfig() {
    // 尝试读取配置文件
    let file = this.getConfigFile()
    // 解析配置文件
    YAML.parse(file)
  }
}
