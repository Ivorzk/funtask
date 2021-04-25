import dce from './../utils/dce'
export default new class {
  // 获取全局配置
  get() {
    return new Promise((resolve, reject) => {
      dce.send('config-get', 'json', {
        resolve,
        reject
      })
    })
  }

  // 设置配置
  set(data) {
    return new Promise((resolve, reject) => {
      dce.send('config-set', data, {
        resolve,
        reject
      })
    })
  }
}
