<template>
<div class="funtask-funlist">
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
</template>
<script>
import {
  ipcRenderer
} from 'electron'
export default {
  data() {
    return {
      cantouch: true,
      // 应用数据
      apps: []
    }
  },
  mounted() {
    ipcRenderer.on('apps-reply', (event, apps) => {
      this.apps = apps
    })
    ipcRenderer.send('apps-get', 'json')
    ipcRenderer.on('app-runing', (event, appInfo) => {
      this.cantouch = true
    })
  },
  methods: {
    // 运行app
    run(app) {
      if (!this.cantouch) return
      this.cantouch = false
      ipcRenderer.send('app-run', app)
    }
  }
}
</script>
<style lang="scss">
.funtask-funlist {
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
</style>
