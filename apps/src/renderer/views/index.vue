<template>
<div id="ball"
  class="suwis-index"
  :class="{show:!control.visible}"
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
    return {
      control: {
        visible: false
      }
    }
  },
  mounted() {
    ipcRenderer.on('control-reply', (event, args) => {
      this.control.visible = args
    })
  },
  watch: {},
  methods: {
    // 切换菜单
    toggle() {
      this.control.visible = !this.control.visible
      ipcRenderer.send('control-toggle', this.control.visible)
      ipcRenderer.sendTo(2, 'control-reply', !this.control.visible)
    }
  }
}
</script>

<style lang="scss" scoped>
.suwis-index {
    position: fixed;
    top: 50%;
    left: 50%;
    // transform: translate(-50%,-50%);
    background: rgba(0,0,0,0.68);
    width: 60px;
    height: 60px;
    margin-left: -30px;
    margin-top: -30px;
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-app-region: drag;
    box-shadow: 0 0 10px 3px rgba(0,0,0,0.3);
    font-size: 18px;
    user-select: none;
    transition: all 0.3s ease-in-out;
    opacity: 0;
    border-radius: 0;
    transform: scale(0);

    &.show {
        opacity: 1;
        border-radius: 100%;
        transform: scale(1);
    }

    &::before {
        position: absolute;
        content: '';
        display: block;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 399;
    }

    img {
        width: 60%;
        height: 60%;
        border-radius: 100%;
        object-fit: cover;
        background: #fff;
        -webkit-app-region: no-drag;
    }
}
</style>
