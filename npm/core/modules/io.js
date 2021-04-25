import dce from './../utils/dce'
export default {
  // 获取全局配置
  download(data) {
    return new Promise((resolve, reject) => {
      dce.send('io-download', data, {
        resolve,
        reject
      })
    })
  }
}
