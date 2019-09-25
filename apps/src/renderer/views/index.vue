<template>
<div id="ball" class="suwis-index" @click="toggle">
  <img class="icon" src="@/assets/logo.jpg" alt="">
</div>
</template>

<script>
const {
  BrowserWindow
} = require('electron').remote
export default {
  data() {
    return {
      menus: {
        // 窗口实例
        win: null,
        // 是否显示
        visible: false
      }
    }
  },
  mounted() {
    this.initMneus()
  },
  watch: {
    'menus.visible'(val) {
      this.menus.win[val ? 'show' : 'hide']()
    }
  },
  methods: {
    // 初始化菜单
    initMneus() {
      this.menus.win = new BrowserWindow({
        width: 600,
        height: 300,
        frame: false,
        transparent: true,
        resizable: false,
        maximizable: false,
        minimizable: false,
        alwaysOnTop: true,
        fullscreenable: false,
        hasShadow: false
      })
      this.menus.win.on('close', () => {
        this.menus.win = null
      })
      this.menus.win.loadURL('http://localhost:9080/#/control')
      this.menus.win.hide()
    },
    // 切换菜单
    toggle() {
      this.menus.visible = !this.menus.visible
    }
  }
}
</script>

<style lang="scss" scoped>
.suwis-index {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: rgba(0,0,0,0.68);
    width: 60px;
    height: 60px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-app-region: drag;
    box-shadow: 0 0 10px 3px rgba(0,0,0,0.3);
    color: red;
    font-size: 18px;
    user-select: none;

    img {
        width: 60%;
        height: 60%;
        border-radius: 100%;
        object-fit: cover;
        background: #fff;
        -webkit-app-region: no-drag;
        user-select: none;
    }
}
</style>
