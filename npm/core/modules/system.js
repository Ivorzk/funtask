import dce from './../utils/dce'
export default new class {
  // 获取全局配置
  getInfo() {
    return new Promise((resolve, reject) => {
      dce.send('system-get-info', 'json', {
        resolve,
        reject
      })
    })
  }

  // 获取唯一标识
  getUUID() {
    return new Promise((resolve, reject) => {
      dce.send('system-get-uuid', 'json', {
        resolve,
        reject
      })
    })
  }
}
