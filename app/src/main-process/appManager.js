/**
 * APP管理类
 */
import fs from 'fs'
import gulp from 'gulp'
import rename from 'gulp-rename'
import path from 'path'
export default class {
  constructor() {}

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
    await this.copyReadme()
    // 所有应用的信息
    global.$apps = []
    var files = fs.readdirSync(global.$config.packagesdir)
    files.forEach((item, index) => {
      let apppath = `${global.$config.packagesdir}/${item}`
      let stat = fs.lstatSync(apppath)
      if (stat.isDirectory() === true) {
        global.$apps.push({
          name: item,
          path: path.resolve(apppath)
        })
      }
    })
  }

  // 载入缓存
  cacheAppData() {

  }
}
