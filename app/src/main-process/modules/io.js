import fs from 'fs'
import request from 'request'

export default class {

  // 下载文件
  download(fileInfo, downloadPath) {
    var received_bytes = 0 //已经接收到的集结
    var total_bytes = item.fileInfo //总字节
    let path = this.downloadPath + '/' + fileInfo.name //确定文件下载的本地位置
    try {
      let stats = fs.statSync(path) //如果文件已存在读取文件信息
      if (total_bytes == stats.size) { //如果文件已经存在并且已经下载按成则跳过该文件
        return;
      }
      received_bytes = stats.size
    } catch (err) {

    }
    let params = {
      method: 'GET',
      url: ''
    }
    if (received_bytes > 0) {
      params.headers['Range'] = 'bytes=' + received_bytes
    }
    var req = request({
      method: 'GET',
      url: ''
    })
    var out = fs.createWriteStream(path) //创建文件写入
    req.pipe(out);
    req.on('response', (data) => {
      startTime = new Date().getTime()
    })
    //接收到文件流事件
    req.on('data', (chunk) => {
      received_bytes += chunk.length
    })
    //文件接收结束
    req.on('end', () => {
      console.log(`file ${item.name} download complete`)
      if (received_bytes >= total_bytes) {
        this.dataset.splice(index, 1)
      }
    })
  }
}
