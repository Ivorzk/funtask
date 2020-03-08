<template>
<div class="funtask-control"
  :class="{show: control.visible,sideslip:control.sideslip}">
  <div class="bg"></div>
  <div class="wrapper">
    <funtask-header @btn-click="headerClick"></funtask-header>
    <!--  -->
    <router-view></router-view>
    <!--  -->
  </div>
  <div class="settings">
    <ol>
      <li @click="$router.push('/appstore')"><i class="iconfont">&#xe63c;</i>应用</li>
      <li><i class="iconfont">&#xeb6e;</i>皮肤</li>
      <li><var class="num">122</var><i class="iconfont">&#xeb7d;</i>通知</li>
    </ol>
    <ul>
      <li><i class="iconfont">&#xe61e;</i>反馈建议</li>
      <li><i class="iconfont">&#xe600;</i>开发社区</li>
      <li><i class="iconfont">&#xe63a;</i>应用设置</li>
      <li><i class="iconfont">&#xe63a;</i>系统设置</li>
      <li @click="$router.push('/funlist')"><i class="iconfont">&#xe63a;</i>菜单</li>
    </ul>
  </div>
</div>
</template>

<script>
import {
  ipcRenderer
} from 'electron'
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
      apps: []
    }
  },
  mounted() {
    ipcRenderer.on('control-reply', (event, args) => {
      this.control.visible = args
    })
    ipcRenderer.on('toggle', (event, visible) => {
      this.control.visible = visible
    })
  },
  watch: {
    'control.visible'(val) {
      if (!val) this.control.sideslip = val
    }
  },
  methods: {
    // 头部点击
    headerClick(type) {
      this[`${type}Toggle`]()
    },
    // 切换界面
    minToggle() {
      this.control.visible = !this.control.visible
      ipcRenderer.send('control-toggle', this.control.visible)
    },
    // 切换设置菜单
    settingsToggle() {
      this.control.sideslip = !this.control.sideslip
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
                margin: 0 auto 0.8vw;
                width: 5vw;
                height: 5vw;
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
                padding: 3px;
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
