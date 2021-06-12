<template>
<div class="funtask-download-helper"
  @click="autodownload">
  <slot :app="app">
    <ul class="platform-list">
      <li @click.stop="download('windows')">
        <i class="iconfont icon-windows"></i>
        Windows
      </li>
      <li @click.stop="download('linux')">
        <i class="iconfont icon-linux"></i>
        Linux
      </li>
      <li @click.stop="download('mac')">
        <i class="iconfont icon-mac"></i>
        Mac
      </li>
    </ul>
  </slot>
</div>
</template>
<script>
import platform from 'platform'
const host = 'https://upyfuntask.suwis.com/funtask/download'
import axios from 'axios'
import YAML from 'js-yaml'
export default {
  data() {
    return {
      app: {},
      os: {}
    }
  },
  mounted() {
    this.getAppInfo()
  },
  methods: {
    apphome(ostype) {
      // console.log(platform, 'platform')
      this.os = platform.os
      let family = ostype || this.os.family.toLocaleLowerCase()
      let arch
      switch (family) {
        case 'windows':
          arch = this.os.architecture == 64 ? 'x64' : 'ia32'
          break
        case 'mac':
          arch = this.os.architecture == 64 ? 'x64' : 'ia32'
          break
        case 'linux':
          arch = this.os.architecture == 64 ? 'x64' : 'ia32'
          break
        case 'ios':
          arch = this.os.architecture == 64 ? 'x64' : 'ia32'
          break
        case 'android':
          arch = this.os.architecture == 64 ? 'x64' : 'ia32'
          break
      }
      // 拼接下载地址
      let url = `${host}/${family}/${arch}`
      return url
    },

    // 获取app信息
    async getAppInfo(os) {
      // console.log(this.apphome(), 'this.apphome')
      let res = await axios.get(this.apphome(os) + '/latest.yml')
      this.app = await YAML.load(res.data)
      // console.log(this.app, 'this.appInfo')
      return this.app
    },

    // 自动下载
    autodownload() {
      location.href = this.apphome() + '/' + this.app.path
    },

    // 手动下载
    async download(ostype) {
      await this.getAppInfo(ostype)
      location.href = this.apphome(ostype) + '/' + this.app.path
    }
  }
}
</script>
<style lang="scss">
.funtask-download-helper {
    // position: relative;
    //
    .platform-list {
        display: flex;
        list-style: none;
        li {
            text-align: center;
            margin: 2rem 3rem;
            cursor: pointer;
        }
        .iconfont {
            display: block;
            margin: auto;
            font-size: 2rem;

            &.icon-windows {
                color: #2d74d7;
            }
        }
    }
}
</style>
