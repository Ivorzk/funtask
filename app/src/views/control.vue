<template>
<div class="suwis-control"
  :class="{show: control.visible}">
  <div class="bg"></div>
  <div class="wrapper">
    <div class="header"></div>
    <!--  -->
    <span @click="toggle"
      class="btn-toggle iconfont">&#xe67c;</span>
    <!--  -->
    <!-- <div class="search-bar">
      <input type="text" name="" value="">
    </div> -->
    <div class="fun-list">
      <ul>
        <li v-for="(app,idx) in apps"
          :key="'app_'+idx">
          <img src="@/assets/logo.jpg"
            alt="">
          <!-- <img :src="'funtask://'+app.data.name+ '/logo.png'"
          alt=""> -->
          <span>
            {{app.data.name}}
          </span>
        </li>
      </ul>
    </div>
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
        visible: false
      },
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
  },
  methods: {
    toggle() {
      this.control.visible = !this.control.visible
      ipcRenderer.send('control-toggle', this.control.visible)
    }
  }
}
</script>

<style lang="scss" scoped>
.suwis-control {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    user-select: none;
    // border-radius: 6px;
    background: rgba(0, 0, 0, 0.69);
    transition: all 0.3s ease-in-out;
    opacity: 0;
    transform: scale(0);
    transform-origin: right bottom;

    &.show {
        opacity: 1;
        transform: none;
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
        position: relative;
        z-index: 99;
    }

    .header {
        height: 36px;
        -webkit-app-region: drag;
        width: calc(100% - 45px);
    }

    .btn-toggle {
        position: absolute;
        right: 12px;
        top: 5px;
        color: #1f85ff;
        font-size: 24px;
        cursor: pointer;
        opacity: 0.6;
        z-index: 99;

        &:hover {
            opacity: 1;
        }
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
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            font-size: 1rem;
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
            }
        }
    }
}
</style>
