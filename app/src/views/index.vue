<template>
<div id="ball"
  class="suwis-index"
  ref="ball"
  :class="{show: control.visible}">
  <img @click="toggle"
    class="icon"
    src="@/assets/logo.jpg"
    alt="ball">
</div>
</template>

<script>
import {
  ipcRenderer
} from 'electron'
export default {
  data() {
    return {
      maskvisible: false,
      control: {
        visible: true
      }
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
  watch: {},
  methods: {
    // 切换菜单
    toggle() {
      this.control.visible = !this.control.visible
      ipcRenderer.send('control-toggle', this.control.visible)
    }
  }
}
</script>

<style lang="scss" scoped>
.suwis-index {
    position: fixed;
    top: 50%;
    left: 50%;
    background: rgba(0,0,0,0.68);
    width: 60px;
    height: 60px;
    margin-left: -30px;
    margin-top: -30px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 10px 3px rgba(0,0,0,0.3);
    font-size: 18px;
    user-select: none;
    transition: all 0.3s ease-in-out;
    opacity: 0;
    border-radius: 0;
    transform: scale(0);
    -webkit-app-region: drag;

    &.show {
        opacity: 1;
        border-radius: 100%;
        transform: scale(1);
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
