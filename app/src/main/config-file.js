import YAML from 'yaml'
import os from 'os'
console.error('os-----------------------------------', os.homeidr())
class Config {
  constructor() {
    setTimeout(() => {
      console.log(os.homeidr(), 'homeidr')
    }, 5000)
  }

  // 获取配置文件目录
  get configdir() {

  }

  // 载入配置文件
  loadConfig() {

  }
}

export default new Config()
