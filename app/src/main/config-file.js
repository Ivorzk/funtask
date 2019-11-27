import YAML from 'yaml'
import os from 'os'
export default class {
  constructor() {
    // console.log(os.homedir(), 'homeidr')
    console.log(this.configdir, 'configdir')
  }

  // 获取配置文件目录
  get configdir() {
    return os.homeidr() + '/.funtask'
  }

  // 载入配置文件
  loadConfig() {

  }
}
