import path from 'path'
import os from 'os'
export default class {
  constructor() {

  }

  // 获取app目录
  get appdir() {
    return path.resolve(`${os.homedir()}/.funtask/packages`)
  }

  // 加载应用
  loadApps() {
    // 检查目录是否有改动

  }

  // 载入缓存
  cacheAppData() {

  }
}
