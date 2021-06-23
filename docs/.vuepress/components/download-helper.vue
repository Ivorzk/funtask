<template>
<div class="funtask-download-helper"
  :class="{show:loaded}"
  @click="autodownload">
  <slot :app="app">
    <ul class="platform-list">
      <li title="点击下载"
        @click.stop="download('windows')">
        <i class="iconfont icon-windows"></i>
        Windows
      </li>
      <li title="点击下载"
        @click.stop="download('linux')">
        <i class="iconfont icon-linux"></i>
        Linux
      </li>
      <!-- <li title="点击下载"
        @click.stop="download('mac')"> -->
      <li class="disable"
        title="开发中，敬请期待">
        <i class="iconfont icon-mac"></i>
        Mac
      </li>
      <!-- <li @click.stop="download('android')"> -->
      <li class="disable"
        title="开发中，敬请期待">
        <i class="iconfont icon-android"></i>
        Android
      </li>
      <!-- <li @click.stop="download('ios')"> -->
      <li class="disable"
        title="开发中，敬请期待">
        <i class="iconfont icon-mac"></i>
        IOS
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
      os: {},
      published: ['windows', 'linux'],
      loaded: false
    }
  },
  mounted() {
    this.getAppInfo().then(() => {
      this.loaded = true
    })
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
      // 检测当前平台是否已发布版本
      if (this.published.indexOf(this.os.family.toLocaleLowerCase()) == -1) {
        alert('当前平台正在开发中,敬请期待')
        return
      }
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
    transition: all 0.3s ease 0.3s;
    opacity: 0;

    &.show {
        opacity: 1;
    }
    .platform-list {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
        li {
            text-align: center;
            margin: 2rem 2vw;
            cursor: pointer;

            &:first-child {
                margin-left: 0;
            }

            &.disable {
                cursor: not-allowed;
                color: #ccc !important;
                * {
                    color: #ccc !important;
                }
            }
        }
        .iconfont {
            display: block;
            margin: auto;
            font-size: 2rem;

            &.icon-windows {
                color: #2d74d7;
            }
            &.icon-android {
                color: #31de84;
            }
        }
    }
}

@media (max-width:720px) {
    .funtask-download-helper {
        .platform-list {
            display: flex;
            li {
                margin: 2rem 3.6vw;
                line-height: 1rem;
            }

            .iconfont {
                font-size: 1.8rem;
            }
        }
    }
}
</style>
