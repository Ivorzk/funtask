<template>
<div class="funtask-settings">
  <mu-container>
    <mu-form label-position="left"
      label-width="138"
      :model="form">
      <mu-form-item label="开机自动启动">
        <mu-switch v-model="autostart"></mu-switch>
      </mu-form-item>
      <mu-form-item label="窗体固定外层">
        <mu-switch v-model="alwaysOnTop"></mu-switch>
      </mu-form-item>
      <mu-form-item label="应用私有模式">
        <mu-radio value="npm"
          v-model="registryType"
          label="npm"></mu-radio>
        <mu-radio value="cnpm"
          v-model="registryType"
          label="cnpm"></mu-radio>
        <mu-radio value="verdaccio"
          v-model="registryType"
          label="verdaccio"></mu-radio>
      </mu-form-item>
      <mu-form-item v-if="registryType=='verdaccio'"
        label="应用镜像仓库">
        <mu-text-field v-model="registry"></mu-text-field>
      </mu-form-item>
    </mu-form>
  </mu-container>
</div>
</template>
<script>
import _ from 'lodash'
export default {
  data() {
    return {
      form: {},
      // 自动启动
      autostart: false,
      // 窗口顶置
      alwaysOnTop: false,
      // 镜像类型
      registryType: 'npm',
      // 镜像地址
      registry: ''
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
    },
    registryType(val) {
      this.$funtask.config.set({
        app: {
          registryType: val
        }
      })
      this.$countly.$emit('system-setting-registryType', {
        val
      })
    },
    registry: _.debounce(function(val) {
      this.$funtask.config.set({
        app: {
          registry: val
        }
      })
      this.$countly.$emit('system-setting-registry', {
        val
      })
    }, 600)
  },
  methods: {
    async getConfig() {
      const config = await this.$funtask.config.get()
      this.autostart = config.app.autostart
      this.registry = config.app.registry
      this.registryType = config.app.registryType
      this.alwaysOnTop = config.app.window.alwaysOnTop
    }
  }
}
</script>
<style lang="scss">
.funtask-settings {
    display: flex;
    justify-content: center;
    height: calc(100vh - 6.8vw);
    color: $funtask-color-primary;

    .mu-form-item {
        color: #fff;
    }
    .mu-radio-label {
        color: #fff;
    }
}
</style>
