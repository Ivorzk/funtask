import {
  protocol
} from 'electron'
import * as path from 'path'
import {
  readFile
} from 'fs'
import {
  URL
} from 'url'

export default {
  // 创建协议
  register(scheme) {
    protocol.registerBufferProtocol(
      scheme,
      (request, respond) => {
        let pathName = new URL(request.url).pathname
        // Needed in case URL contains spaces
        pathName = decodeURI(pathName)
        // 查找文件
        this.findFile(request, pathName).then(data => {
          let extension = path.extname(pathName).toLowerCase()
          let mimeType = ''
          if (extension === '.js') {
            mimeType = 'text/javascript'
          } else if (extension === '.html') {
            mimeType = 'text/html'
          } else if (extension === '.css') {
            mimeType = 'text/css'
          } else if (extension === '.svg' || extension === '.svgz') {
            mimeType = 'image/svg+xml'
          } else if (extension === '.json') {
            mimeType = 'application/json'
          }
          respond({
            mimeType,
            data
          })
        }).catch(error => {
          console.error(`Failed to register ${scheme} protocol`, error)
        })
      },
      error => {
        if (error) {
          console.error(`Failed to register ${scheme} protocol`, error)
        }
      }
    )
  },
  findFile(request, pathName) {
    return new Promise((resolve, reject) => {
      console.log(request, 'request')
      // 判断资源来源主框架、应用目录、debug目录
      let paths = []
      let dirs = [__dirname, global.$config.packagesdir, ...global.$config.dev.debugdirs]
      dirs.forEach((dir, idx) => {
        if (idx > 1) {
          dir = dir.substr(0, dir.lastIndexOf('/'))
        }
        paths.push(path.join(dir, pathName))
      })
      // console.log(paths, 'paths')
      var loopFun = (paths, idx) => {
        // 应用包查找
        readFile(paths[idx], (error, data) => {
          if (error) {
            idx < paths.length - 1 ? loopFun(paths, idx + 1) : reject('')
            return
          }
          resolve(data)
        })
      }
      // 递归查找
      loopFun(paths, 0)
    })
  }
}
