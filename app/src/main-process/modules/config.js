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
import {
  watch
} from 'gulp'
const store = new Store()
let watcher = {}
import _ from 'lodash'
export default class {
  constructor() {
    // 首次加载
    this.isFirstLoad = true
    // 初始化事件实例
    this.event = new events.EventEmitter()
    // 加载配置文件
    this.loadConfig().then(() => {
      // 监听
      this.watchConfigFile()
    })

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
      evt.reply('userinfo-set-reply', true)
    })

    // 获取用户信息
    ipcMain.on('userinfo-get', async (evt, data) => {
      let userInfo = store.get('userInfo')
      evt.reply('userinfo-get-reply', userInfo ? userInfo.user : '')
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
      // 读取默认配置文件
      defaultFile = fs.readFileSync(`${__static}/default-config.yaml`, 'utf8')
      // 写入默认配置文件至配置目录
      await fs.outputFile(this.apphome + '/config.yaml', defaultFile)
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
      // 如果报错则尝试删除配置文件，重新设置
      fs.remove(`${this.apphome}/config.yaml`)
      // 重新执行
      return this.setConfig(options)
    }
    // 重新加载
    await this.loadConfig()
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
    // 修改状态
    this.isFirstLoad = false
  }

  // 监听配置文件
  watchConfigFile() {
    // 防止多次监听
    try {
      watcher.close()
    } catch (e) {}
    watcher = watch(`${this.apphome}/config.yaml`)
    watcher.on(`change`, _.debounce((e) => {
      this.loadConfig()
    }, 150))
    watcher.on(`add`, (e) => {
      console.log('add')
      this.loadConfig()
    })
  }
}
