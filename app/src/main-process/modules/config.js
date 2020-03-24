/**
 * 配置文件
 * @type {events} 事件
 */
import YAML from 'yaml'
import path from 'path'
import os from 'os'
import fs from 'fs'
import gulp from 'gulp'
import rename from 'gulp-rename'
import events from 'events'
import chokidar from 'chokidar'
import {
  ipcMain
} from 'electron'
export default class {

  constructor() {
    // 首次加载
    this.isFirstLoad = true
    // 初始化事件实例
    this.event = new events.EventEmitter()
    // 加载配置文件
    this.loadConfig()

    // 监听web端向app请求配置信息
    ipcMain.on('config-get', (evt) => {
      evt.reply('config-reply', global.$config)
    })

    ipcMain.on('config-get', (evt) => {
      evt.reply('config-reply', global.$config)
    })
  }

  // 获取配置文件目录
  get apphome() {
    return path.resolve(os.homedir() + '/.funtask')
  }

  // 获取app目录
  get packagesdir() {
    return path.resolve(`${os.homedir()}/.funtask/packages`)
  }

  // 检查配置文件是否存在
  async getConfigFile() {
    let file = ''
    try {
      file = fs.readFileSync(`${this.apphome}/config.yaml`, 'utf8')
    } catch (e) {
      // 复制默认配置文件至配置目录
      gulp.src(`${__static}/default-config.yaml`)
        .pipe(rename('config.yaml'))
        .pipe(gulp.dest(this.apphome))
      // 读取默认配置文件
      file = fs.readFileSync(`${__static}/default-config.yaml`, 'utf8')
    }
    return file
  }

  // 载入配置文件
  async loadConfig() {
    // 尝试读取配置文件
    let file = await this.getConfigFile()
    var $config = YAML.parse(file)
    // 解析配置文件并注入到全局变量中
    global.$config = {
      ...$config,
      apphome: this.apphome,
      packagesdir: this.packagesdir,
      tmpdir: os.tmpdir()
    }
    // 触发配置表加载完成事件
    this.event.emit(this.isFirstLoad ? 'loaded' : 'change', global.$config)
    // 开始监听文件改变
    this.watchConfigFile()
    // 修改状态
    this.isFirstLoad = false
  }

  // 监听配置文件
  watchConfigFile() {
    // 监听
    gulp.watch(`${this.apphome}/config.yaml`, () => {
      this.watchConfigFile()
    })
  }
}
