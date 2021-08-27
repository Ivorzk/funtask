<template>
<div class="funtask-funlist">
  <ul>
    <li v-for="(app,idx) in apps"
      v-show="!app.disabled"
      :key="'app_'+idx"
      @click="start(app)"
      @contextmenu="showContextMenu(app)">
      <img v-lazy="app.logo"
        alt="">
      <i v-if="app.debug"
        class="debug">开发版</i>
      <span>
        {{app.name}}
      </span>
    </li>
  </ul>
  <p :class="{show:apps.length==0}"
    class="no-data-tips">点击右上角菜单图标 - 点击应用 - 安装您需要的工具</p>
</div>
</template>
<script>
import electron from '@suwis/funtask/core/utils/electron'
import _ from 'lodash'
export default {
  data() {
    return {
      cantouch: true,
      // 应用数据
      apps: []
    }
  },
  mounted() {
    this.getApps()
    // 监听系统刷新
    electron.ipcRenderer.on('dev-update', (event, visible) => {
      this.getApps()
    })
    this.$funtask.app.login().then(code => {
      console.log(code, 'code')
    })
  },
  methods: {
    async getApps() {
      const apps = await this.$funtask.app.getApps()
      this.apps = apps || []
    },
    // 运行app
    async start(app) {
      if (!this.cantouch) return
      this.cantouch = false
      await this.$funtask.app.start(app)
      this.cantouch = true
      // 收起面板
      this.$parent.minToggle()
      this.$countly.$emit('app-run', app.package)
    },
    // 卸载
    async uninstall(app) {
      await this.$funtask.app.uninstall(app.package)
      await this.getApps()
      this.$countly.$emit('app-uninstall', app.package)
    },
    // 显示右键菜单
    showContextMenu(app) {
      this.$funtask.app.showContextMenu([{
        label: '打开',
        key: 'start'
      }, {
        label: '卸载',
        key: 'uninstall'
      }]).then((item) => {
        this.contextMenuReply(item, app)
      })
    },
    // 右键菜单回应
    contextMenuReply: _.debounce(function(item, app) {
      this[item.key](app)
    }, 100)
  }
}
</script>
<style lang="scss">
.funtask-funlist {
    position: relative;
    z-index: 10;
    height: calc(100vh - 6.8vw);
    overflow: auto;
    padding: 3vw 0;

    ul {
        display: flex;
        flex-wrap: wrap;
        list-style: none;
        margin: 0;
        padding: 0 1.68vw;
    }

    li {
        max-width: 20%;
        min-width: 20%;
        color: #fff;
        text-align: center;
        flex-wrap: wrap;
        font-size: $funtask-font-size-base;
        cursor: pointer;
        box-sizing: border-box;
        padding: 0 1.68vw 5vw;
        transition: all 0.3s ease;
        position: relative;

        &:active {
            opacity: 0.8;
        }

        img {
            display: block;
            margin: auto;
            width: 8vw;
            height: 8vw;
            object-fit: cover;
            border-radius: 100%;
        }

        .debug {
            font-style: normal;
            font-size: 12px;
            background: rgba(0,0,0,0.5);
            padding: 2px 5px;
            position: absolute;
            border-radius: 3px;
            transform: translate(-30%,-56%) scale(0.75);
            left: 50%;
            color: $funtask-color-primary;
        }

        span {
            padding-top: 1.68vw;
            display: block;
            width: 100%;
        }
    }

    .no-data-tips {
        position: absolute;
        text-align: center;
        height: calc(100% - 45px);
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0;
        padding: 0;
        color: $funtask-color-primary;
        opacity: 0.68;
        z-index: 300;
        width: 100%;
        top: 0;
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s ease;

        &.show {
            opacity: 1;
        }
    }
}
</style>
