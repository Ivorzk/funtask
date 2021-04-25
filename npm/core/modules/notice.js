import dce from './../utils/dce'
export default new class {
  // 发送消息
  send(data) {
    return new Promise((resolve, reject) => {
      dce.send('notice-send', data, {
        resolve,
        reject
      })
    })
  }

  // 获取消息列表
  getList(data) {
    return new Promise((resolve, reject) => {
      dce.send('notice-get-list', data, {
        resolve,
        reject
      })
    })
  }

  // 删除消息
  remove(data) {
    return new Promise((resolve, reject) => {
      dce.send('notice-remove', data, {
        resolve,
        reject
      })
    })
  }
}
