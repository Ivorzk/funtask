<template>
<div class="funtask-control"
  :class="{show: control.visible,sideslip:control.sideslip}">
  <div class="bg"></div>
  <div class="wrapper">
    <funtask-header @btn-click="headerClick"></funtask-header>
    <!--  -->
    <!-- <div class="search-bar">
      <input type="text" name="" value="">
    </div> -->
    <div class="fun-list">
      <ul>
        <li v-for="(app,idx) in apps"
          :key="'app_'+idx"
          @click="run(app)">
          <img v-lazy="app.logo"
            alt="">
          <span>
            {{app.name}}
          </span>
        </li>
      </ul>
    </div>
  </div>
  <!-- 菜单 -->
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
    ipcRenderer.on('apps-reply', (event, apps) => {
      this.apps = apps
    })
    ipcRenderer.send('apps-get', 'json')
    ipcRenderer.on('app-runing', (event, appInfo) => {
      this.cantouch = true
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
    },
    // 运行app
    run(app) {
      if (!this.cantouch) return
      this.cantouch = false
      ipcRenderer.send('app-run', app)
    }
  }
}
</script>

<style lang="scss" scoped>
.funtask-control {
    position: relative;
    width: 100vw;
    height: 100vh;
    user-select: none;
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

    .search-bar {
        padding: 20px;
        position: relative;
        z-index: 10;

        input {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            padding: 9px;
            border: none;
            background: rgba(255, 255, 255, 1);
            border-radius: 3px;
            font-size: 12px;
        }
    }

    .fun-list {
        position: relative;
        z-index: 10;
        height: calc(100vh - 36px);
        overflow: auto;
        padding: 15px 0;

        ul {
            display: flex;
            flex-wrap: wrap;
            list-style: none;
            margin: 0;
            padding: 0 1.68vw;
            height: calc(100vh - 80px);
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

            span {
                padding-top: 1.68vw;
                display: block;
                width: 100%;
            }
        }
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
