<template>
<div class="funtask-download-helper">
  <slot></slot>
</div>
</template>
<script>
import platform from 'platform'
const host = 'https://upyfuntask.suwis.com/funtask/download'
export default {
  data() {
    return {
      app: {}
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let os = platform.os().toLocaleLowerCase()
      let client = 'windows'
      if (os.indexOf('ios') > -1) client = 'ios'
      if (os.indexOf('linux') > -1) client = 'linux'
      if (os.indexOf('mac') > -1) client = 'mac'
      if (os.indexOf('android') > -1) client = 'android'
      // 拼接下载地址
      let url = `${host}/${os}/${type}`

    }
  }
}
</script>
<style lang="scss">
.funtask-download-helper {
    position: relative;
}
</style>
