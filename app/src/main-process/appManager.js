/**
 * APP管理类
 */
import fs from 'fs'
import gulp from 'gulp'
import rename from 'gulp-rename'
import path from 'path'
import {
  ipcMain
} from 'electron'
export default class {
  constructor() {
    // 获取app菜单
    ipcMain.on('apps-get', (evt, dataType) => {
      evt.reply('apps-reply', global.$apps)
    })
  }

  // 初始化readme文件
  copyReadme() {
    // 复制readme文件到packages目录中
    return new Promise((resolve, reject) => {
      gulp.src(`${__static}/packages-readme.md`)
        .pipe(rename('README.md'))
        .pipe(gulp.dest(global.$config.packagesdir))
        .on('end', () => {
          resolve(true)
        })
    })
  }

  // 加载应用
  async loadApps() {
    // await this.copyReadme()
    // 所有应用的信息
    global.$apps = []
    // 遍历包存放目录
    let dirs = await this.eachdirs([global.$config.packagesdir])
    // 获取调试目录
    let debugdirs = global.$config.dev.debugdirs || []
    // 获取app信息
    global.$apps = await this.eachAppInfo([...dirs, ...debugdirs])
    //
    console.log(global.$apps)
  }

  // 遍历目录
  eachdirs(dirs) {
    return new Promise((resolve, reject) => {
      let apppaths = []
      var loopFun = (idx) => {
        try {
          var files = fs.readdirSync(dirs[idx])
          files.forEach((item, index) => {
            let apppath = `${dirs[idx]}/${item}`
            let stat = fs.lstatSync(apppath)
            if (stat.isDirectory() === true) {
              apppaths.push(path.resolve(apppath))
            }
          })
        } catch (e) {}
        idx += 1
        idx > dirs.length - 1 ? resolve(apppaths) : loopFun(idx)
      }
      loopFun(0)
    })
  }

  // 遍历app信息
  eachAppInfo(dirs) {
    return new Promise((resolve, reject) => {
      let apps = []
      dirs.forEach(apppath => {
        try {
          var file = fs.readFileSync(path.resolve(apppath + '/package.json'), 'utf-8')
          if (file) {
            let data = JSON.parse(file)
            data.logo = path.resolve(apppath + '/logo.png')
            data.name = data.name.replace('@funtask/', '')
            apps.push({
              data,
              path: apppath
            })
          }
        } catch (e) {
          // console.log(e, 'e')
        }
      })
      resolve(apps)
    })
  }

  // 载入缓存
  cacheAppData() {

  }
}
