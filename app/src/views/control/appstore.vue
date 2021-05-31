<template>
<div class="funtask-appstore">
  <input class="search-input" v-model="keywords" type="text" placeholder="请输入关键字">
  <div class="app-list">
    <dl v-for="(app,idx) in remoteApps" v-show="app.name.indexOf('funtask-')===0" :class="{disabled:app.disabled}" :key="idx">
      <dt>{{app.name}}</dt>
      <dd>{{app.description}}</dd>
      <dd><label v-for="key in app.keywords" :key="key">{{key}}</label></dd>
      <dd class="between">
        <span>
          <!-- <img class="avatar"
            src="https://s.gravatar.com/avatar/d58973c038d271823c09420d1a0bb64e?size=100&default=retro"
            alt=""> -->
          {{app.publisher.username}} 发布版本 v{{app.version}} • &nbsp;&nbsp;于{{app.date|timediff}}前
          <template v-if="app.localVersion">
            (当前版本:v{{app.localVersion}})

          </template>
        </span>
        <span v-if="!app.installed" class="btn-group">
          <button @click="install(app)"><i v-if="app.installing" class="iconfont waiting">&#xe640;</i><i v-else class="iconfont">&#xe71f;</i>安装</button>
        </span>
        <span v-else class="btn-group">
          <!-- <button><i class="iconfont">&#xe63a;</i>设置</button> -->
          <button @click="uninstall(app)">
            <i v-if="app.removeling" class="iconfont waiting">&#xe640;</i>
            <i class="iconfont" v-else>&#xe619;</i>删除</button>
          <button class="btn-enable" v-if="app.disabled" @click="enable(app)"><i class="iconfont">&#xe61c;</i>启用</button>
          <button v-else @click="disable(app)"><i class="iconfont">&#xe76a;</i>禁用</button>
          <button v-if="app.version!=app.localVersion" @click="update(app,idx)">
            <i v-if="app.installing" class="iconfont waiting">&#xe640;</i><i v-else class="iconfont">&#xe71f;</i>更新
          </button>
        </span>
      </dd>
    </dl>
  </div>
  <div class="loading" :class="{show:loading&&remoteApps.length==0}">
    <img src="@/assets/loading.svg" alt="">
  </div>
  <div class="loading" :class="{show:!loading&&remoteApps.length==0}">
    <span>暂无数据~</span>
  </div>
</div>
</template>
<script>
import _ from 'lodash'
export default {
  data() {
    return {
      // 关键字
      keywords: '',
      // 远端搜索app列表
      remoteApps: [],
      // 本地app列表
      localApps: [],
      // 加载状态
      loading: true
    }
  },
  mounted() {
    // 获取本地app
    this.getLocalApps().then(() => {
      this.searchApps()
    })
  },
  watch: {
    keywords: _.debounce(function() {
      this.searchApps()
    }, 300),
    remoteApps() {
      this.updateAppState()
    }
  },
  filters: {
    timediff(val) {
      const startDate = new Date(val)
      const endDate = new Date()
      // 时间差的毫秒数
      const diff = endDate.getTime() - startDate.getTime()

      // 计算出相差天数
      const days = Math.floor(diff / (24 * 3600 * 1000))

      // 计算出小时数
      const leave1 = diff % (24 * 3600 * 1000)
      // 计算天数后剩余的毫秒数
      const hours = Math.floor(leave1 / (3600 * 1000))
      // 计算相差分钟数
      const leave2 = leave1 % (3600 * 1000)
      // 计算小时数后剩余的毫秒数
      const minutes = Math.floor(leave2 / (60 * 1000))

      // 计算相差秒数
      const leave3 = leave2 % (60 * 1000)
      // 计算分钟数后剩余的毫秒数
      const seconds = Math.round(leave3 / 1000)

      if (days > 0) {
        if (days > 365) return Math.floor(days / 365) + '年'
        if (days > 30) return Math.floor(days / 30) + '个月'
        return days + '天'
      }
      if (hours > 0) {
        return hours + '小时'
      }
      if (minutes > 0) {
        return minutes + '分'
      }
      if (seconds > 0) {
        return seconds + '秒'
      }
    }
  },
  methods: {
    // 获取应用
    async searchApps() {
      this.remoteApps = []
      this.loading = true
      const res = await this.$axios.get(`https://www.npmjs.com/search/suggestions?q=funtask-${this.keywords}`)
      this.remoteApps = res.data || []
      this.loading = false
      this.$countly.$emit('app-search', {
        keywords: this.keywords
      })
    },
    // 获取系统app
    async getLocalApps() {
      const apps = await this.$funtask.app.getApps()
      this.localApps = apps
      return apps
      // console.log(this.localApps, 'localApps')
    },
    // 安装应用
    async install(app) {
      try {
        this.$countly.$emit('app-installing', app)
      } catch (e) {}
      this.$set(app, 'installing', app)
      // 获取应用下载地址
      let res = await this.$funtask.app.install(app)
      // 重新加载本地app列表
      await this.getLocalApps()
      // 更新安装状态
      this.updateAppState()
      this.remoteApps.forEach((item) => {
        if (item.name == res.name) {
          this.$set(item, 'installing', false)
        }
      })
      this.$countly.$emit('app-installed', app)
    },
    // 删除
    async uninstall(app) {
      // 设置删除状态
      this.$set(app, 'removeling', true)
      // 获取应用下载地址
      let res = await this.$funtask.app.uninstall(app)
      // 重新加载本地app列表
      await this.getLocalApps()
      // 更新安装状态
      this.updateAppState()
      this.$countly.$emit('app-uninstall', app)
    },
    // 更新app状态
    updateAppState() {
      for (const rapp of this.remoteApps) {
        this.$set(rapp, 'installed', false)
        this.$set(rapp, 'removeling', false)
        this.$set(rapp, 'disabled', false)
        this.$set(rapp, 'localVersion', '')
        for (const lapp of this.localApps) {
          if (lapp.package.name === rapp.name) {
            rapp.installed = true
            rapp.localVersion = lapp.package.version
            rapp.disabled = lapp.disabled
          }
        }
      }
    },
    // 更新应用
    async update(app, idx) {
      // 安装应用
      await this.install(app)
      app.localVersion = app.version
      this.$countly.$emit('app-update', app)
    },
    // 禁用
    async disable(app) {
      await this.$funtask.app.disable(app)
      // 重新加载本地app列表
      await this.getLocalApps()
      // 更新安装状态
      this.updateAppState()
      this.$countly.$emit('app-disable', app)
    },
    // 启用
    async enable(app) {
      await this.$funtask.app.enable(app)
      // 重新加载本地app列表
      await this.getLocalApps()
      // 更新安装状态
      this.updateAppState()
      this.$countly.$emit('app-enable', app)
    }
  }
}
</script>
<style lang="scss">
.funtask-appstore {
    position: relative;
    height: calc(100vh - 36px);
    overflow: auto;
    color: $funtask-text-color-inverse;
    padding: 0 $funtask-spacing-row-base*2.39 $funtask-spacing-row-base*1.8;
    font-size: $funtask-font-size-base;
    box-sizing: border-box;

    .search-input {
        width: 100%;
        border: none;
        border-bottom: 2px solid rgba($funtask-color-primary,0.6);
        background: transparent;
        color: $funtask-text-color-inverse;
        padding: $funtask-spacing-col-base 0;
        margin-bottom: $funtask-spacing-col-lg;
        transition: all 0.3s ease;

        &:focus {
            border-color: rgba($funtask-color-primary,1);
        }
    }

    .app-list {
        dl {
            background: rgba(0,0,0,0.28);
            padding: $funtask-spacing-row-base $funtask-spacing-row-lg;
            border-radius: $funtask-border-radius-sm;
            &:first-child {
                margin-top: 0;
            }

            &.disabled {
                opacity: 0.58;
                .btn-group {
                    button:not(.btn-enable) {
                        pointer-events: none;
                    }
                }
            }

            dd,
            dt {
                margin: 0;
                padding: $funtask-spacing-col-sm 0;
                display: flex;
                align-items: center;
                flex-wrap: wrap;

                &.between {
                    justify-content: space-between;
                }
            }
            dt {
                color: $funtask-color-primary;
                font-size: $funtask-font-size-lg;
            }

            dd {
                label {
                    background: rgba($funtask-color-primary, 0.58);
                    padding: $funtask-spacing-col-sm * 0.5 $funtask-spacing-row-sm;
                    border-radius: $funtask-border-radius-sm * 0.5;
                    margin-right: $funtask-spacing-row-base;
                    color: rgba($funtask-text-color-inverse, 0.68);
                    display: block;
                    margin-bottom: $funtask-spacing-row-base;
                }

                &:nth-child(3) {
                    position: relative;
                    top: 1vw;
                }
            }
        }
        .avatar {
            max-width: 16px;
            border-radius: $funtask-border-radius-sm / 2;
            margin-right: $funtask-spacing-row-sm;
            vertical-align: top;
            display: inline-block;
        }
        .btn-group {
            display: flex;
            align-items: center;
        }
        button {
            background: transparent;
            border: none;
            padding: $funtask-spacing-col-sm $funtask-spacing-row-sm;
            color: $funtask-color-primary;
            cursor: pointer;
            margin-left: $funtask-spacing-row-base;
            display: flex;
            align-items: flex-end;

            .iconfont {
                position: relative;
                top: 0.3px;
                margin-right: $funtask-spacing-row-sm * 0.8;
            }

            .waiting {
                animation: waiting 0.6s infinite linear;
            }
        }
        @keyframes waiting {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    }

    .loading {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: calc(100vh - 70px);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        pointer-events: none;

        &.show {
            opacity: 1;
        }

        img {
            max-width: 39px;
            opacity: 0.5;
        }
        span {
            color: $funtask-color-primary;
            opacity: 0.5;
        }
    }
}
</style>
