/**
 * 配置文件
 * @type {events} 事件
 */
import YAML from 'yaml'
import path from 'path'
import os from 'os'
import fs from 'fs-extra'
import gulp from 'gulp'
import events from 'events'
import {
  ipcMain
} from 'electron'
import lodash from 'lodash'
import Store from 'electron-store'
const store = new Store()
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
      evt.reply('config-get-reply', global.$config)
    })

    // 设置配置
    ipcMain.on('config-set', async (evt, options) => {
      const res = await this.setConfig(options)
      evt.reply('config-set-reply', res)
    })

    // 设置用户信息
    ipcMain.on('userinfo-set', async (evt, data) => {
      store.set('userInfo', data)
      evt.reply('userinfo-set-reply', res)
    })

    // 获取用户信息
    ipcMain.on('userinfo-get', async (evt, data) => {
      let userInfo = store.get('userInfo')
      evt.reply('userinfo-get-reply', userInfo)
    })

    // 获取用户信息
    ipcMain.on('userinfo-delete', async (evt, data) => {
      store.delete('userInfo')
      evt.reply('userinfo-delete-reply', true)
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
    let custom = ''
    let defaultFile = ''
    // 判断用户配置文件是否存在
    let exist = await fs.pathExists(`${this.apphome}/config.yaml`)
    if (exist) {
      custom = fs.readFileSync(`${this.apphome}/config.yaml`, 'utf8')
    } else {
      // 复制默认配置文件至配置目录
      await fs.copy(`${__static}/default-config.yaml`, this.apphome + '/config.yaml')
      // 读取默认配置文件
      defaultFile = fs.readFileSync(`${__static}/default-config.yaml`, 'utf8')
    }
    return {
      custom: custom || defaultFile,
      default: defaultFile
    }
  }

  // 设置配置文件
  async setConfig(options) {
    // 尝试读取配置文件
    const file = await this.getConfigFile()
    let $config = YAML.parse(file.custom)
    $config = lodash.defaultsDeep(options, $config)
    const configYaml = YAML.stringify($config)
    // 写入文件
    try {
      await fs.writeFileSync(`${this.apphome}/config.yaml`, configYaml)
    } catch (e) {
      // 如果报错则删除配置文件，重新设置
      await fs.remove(`${this.apphome}/config.yaml`)
      // 重新执行
      await this.setConfig(options)
    }
    return true
  }

  // 载入配置文件
  async loadConfig() {
    // 尝试读取配置文件
    const file = await this.getConfigFile()
    let $config = YAML.parse(file.custom)
    const $default = YAML.parse(file.default)
    $config = lodash.defaultsDeep($config, $default)
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
      this.loadConfig()
    })
  }
}
