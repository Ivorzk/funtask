import dce from './../utils/dce'
export default {
  // 获取全局配置
  get() {
    return new Promise((resolve, reject) => {
      dce.send('bluetooth-get', 'json', {
        resolve,
        reject
      })
    })
  }
}
