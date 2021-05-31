<template>
<div class="funtask-settings">
  <mu-container>
    <mu-form label-position="left" label-width="138" :model="form">
      <mu-form-item label="开机自动启动">
        <mu-switch v-model="autostart"></mu-switch>
      </mu-form-item>
      <mu-form-item label="窗体固定外层">
        <mu-switch v-model="alwaysOnTop"></mu-switch>
      </mu-form-item>
    </mu-form>
  </mu-container>
</div>
</template>
<script>
export default {
  data() {
    return {
      form: {},
      // 自动启动
      autostart: false,
      // 窗口顶置
      alwaysOnTop: false
    }
  },
  beforeMount() {
    this.getConfig()
  },
  watch: {
    autostart(val) {
      this.$funtask.config.set({
        app: {
          autostart: val
        }
      })
      this.$countly.$emit('system-setting-autostart', {
        val
      })
    },
    alwaysOnTop(val) {
      this.$funtask.config.set({
        app: {
          window: {
            alwaysOnTop: val
          }
        }
      })
      this.$countly.$emit('system-setting-alwaysOnTop', {
        val
      })
    }
  },
  methods: {
    async getConfig() {
      const config = await this.$funtask.config.get()
      this.autostart = config.app.autostart
      this.alwaysOnTop = config.app.window.alwaysOnTop
    }
  }
}
</script>
<style lang="scss" scoped>
.funtask-settings {
    display: flex;
    justify-content: center;
    height: calc(100vh - 6.8vw);
    color: $funtask-color-primary;

    .mu-form-item {
        color: #fff;
    }
}
</style>
