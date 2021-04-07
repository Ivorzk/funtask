<template>
<div class="funtask-control" :class="{show: control.visible,sideslip:control.sideslip}">
  <div class="bg"></div>
  <div class="wrapper">
    <funtask-header @btn-click="headerClick"></funtask-header>
    <!--  -->
    <router-view></router-view>
    <!--  -->
  </div>
  <div class="settings">
    <ol>
      <li role="toggle" @click="navlink('/appstore')"><i class="iconfont">&#xe605;</i>应用</li>
      <li role="toggle" @click="navlink('/funlist')"><i class="iconfont">&#xe63c;</i>菜单</li>
      <li role="toggle" @click="navlink('/notice-list')"><var v-show="noticesCount!='00'" class="num">{{noticesCount}}</var><i class="iconfont">&#xeb7d;</i>通知</li>
    </ol>
    <ul>
      <li role="toggle" @click="navlink('/feedback')"><i class="iconfont">&#xe61e;</i>反馈建议</li>
      <li role="toggle" @click="navlink('https://funtask.club')"><i class="iconfont">&#xe600;</i>开发社区</li>
      <li @click="navlink('/themes')" role="toggle"><i class="iconfont">&#xeb6e;</i>皮肤设置</li>
      <li @click="navlink('/settings')" role="toggle"><i class="iconfont">&#xe63a;</i>系统设置</li>
    </ul>
  </div>
</div>
</template>

<script>
import electron from '@suwis/funtask/core/utils/electron'
export default {
  data() {
    return {
      control: {
        visible: false,
        // 侧滑状态
        sideslip: false
      },
      cantouch: true,
      // 应用数据
      apps: [],
      // 通知
      notices: []
    }
  },
  computed: {
    noticesCount() {
      const length = this.notices.length
      if (length < 10) return `0${length}`
      if (length > 99) return '99+'
      return length
    }
  },
  mounted() {
    electron.ipcRenderer.on('control-reply', (event, args) => {
      this.control.visible = args
    })
    electron.ipcRenderer.on('toggle', (event, visible) => {
      this.control.visible = visible
    })
  },
  watch: {
    'control.visible'(val) {
      if (!val) this.control.sideslip = val
    },
    $route() {
      this.settingsClose()
    }
  },
  methods: {
    // 头部点击
    headerClick(type) {
      // 获取消息列表
      this.getNotices()
      this[`${type}Toggle`]()
    },
    // 切换界面
    minToggle() {
      this.control.visible = !this.control.visible
      electron.ipcRenderer.send('control-toggle', this.control.visible)
    },
    // 切换设置菜单
    settingsToggle() {
      this.control.sideslip = !this.control.sideslip
    },
    // 关闭右侧菜单
    settingsClose() {
      this.control.sideslip = false
    },
    navlink(path) {
      path.indexOf('http') > -1 ? electron.shell.openExternal(path) : this.$router.push(path)
      this.settingsClose()
    },
    // 获取消息列表
    async getNotices() {
      const res = await this.$funtask.notice.getList()
      this.notices = res || []
    }
  }
}
</script>

<style lang="scss" scoped>
.funtask-control {
    position: relative;
    width: 100vw;
    height: 100vh;
    background: $funtask-bg-color-mask;
    transition: all 0.3s ease-in-out;
    opacity: 0;
    left: 0;
    transform: scale(0);
    transform-origin: right bottom;

    &.show {
        opacity: 1;
        transform: none;
    }

    &.sideslip {
        .wrapper {
            left: -39vw;
        }
        .settings {
            right: 0;
        }
    }

    .bg {
        position: absolute;
        width: 100vw;
        height: 100vh;
        left: 0;
        top: 0;
        margin: 0 auto;
        background: rgba(0, 0, 0, 1);
        overflow: hidden;
        filter: blur(39px);
        opacity: 0.39;
        z-index: 0;
    }

    .wrapper {
        transition: all 0.3s ease-in-out;
        position: relative;
        left: 0;
        z-index: 99;
    }

    .settings {
        position: absolute;
        transition: all 0.3s ease-in-out;
        background: $funtask-bg-color-mask;
        width: 39vw;
        height: 100vh;
        top: 0;
        right: -39vw;
        color: $funtask-text-color-inverse;
        font-size: $funtask-font-size-base;

        ol,
        ul {
            list-style: none;
            padding: 0;
            margin: 0;
            li {
                padding: $funtask-spacing-col-base * 1.28 $funtask-spacing-row-base;
                cursor: pointer;
            }

        }

        ol {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: $funtask-spacing-col-base 0;
            .iconfont {
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0 auto 1vw;
                width: 5.18vw;
                height: 5.18vw;
                font-size: $funtask-font-size-lg * 1.28;
                background: $funtask-color-primary;
                border-radius: 100%;
                padding: 0.28vw;
                opacity: 0.8;
                transition: all 0.3s ease;
            }
            .num {
                font-style: normal;
                background: $funtask-bg-color;
                color: $funtask-color-primary;
                position: absolute;
                z-index: 99;
                font-size: 10px;
                padding: 1px 3px;
                min-width: 10px;
                margin-top: -8px;
                margin-right: -8px;
                text-align: center;
                border-radius: 30px;
                opacity: 0.9;
            }
            li {
                flex: 1;
                text-align: center;

                &:hover {
                    .iconfont {
                        opacity: 1;
                    }
                }
            }
        }

        ul {
            padding: $funtask-spacing-col-lg $funtask-spacing-row-lg;
            .iconfont {
                width: 30px;
            }
            li {
                display: flex;
                align-items: center;
            }
        }
    }
}
</style>
