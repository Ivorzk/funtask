import YAML from 'yaml'
import path from 'path'
import os from 'os'
import fs from 'fs'
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
      file = fs.readFileSync(path.resolve(`./static/default-config.yaml`), 'utf8')
      // 复制默认配置文件至配置目录
      fs.copyFileSync(path.resolve(`./static/default-config.yaml`), path.resolve(`${this.configdir}/config.yaml`))
    }
    return file
  }

  // 载入配置文件
  async loadConfig() {
    // 尝试读取配置文件
    let file = await this.getConfigFile()
    // 解析配置文件并注入到全局变量中
    global.$config = YAML.parse(file)
  }
}
