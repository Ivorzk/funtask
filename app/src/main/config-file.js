import YAML from 'yaml'
import os from 'os'
console.log('os-----------------------------------', os.homeidr())
class Config {
  constructor() {
    console.log(os.homeidr(), 'homeidr')
  }

  // 获取配置文件目录
  get configdir() {

  }

  // 载入配置文件
  loadConfig() {

  }
}

export default new Config()
