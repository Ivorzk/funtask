<template>
<div id="ball"
  class="suwis-index"
  @click="toggle">
  <img class="icon"
    src="@/assets/logo.jpg"
    alt="">
</div>
</template>

<script>
import {
  ipcRenderer
} from 'electron'

export default {
  data() {
    return {}
  },
  mounted() {
    // ipcRenderer.on('asynchronous-reply', (event, arg) => {
    //   console.log(arg) // prints "pong"
    // })
  },
  watch: {},
  methods: {
    // 切换菜单
    toggle() {
      ipcRenderer.send('menu-toggle', {})
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
