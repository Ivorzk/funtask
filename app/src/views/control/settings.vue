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
      <mu-form-item label="应用私有模式">
        <mu-switch v-model="privateMode"></mu-switch>
      </mu-form-item>
      <mu-form-item v-show="privateMode" label="私有镜像仓库">
        <mu-text-field @blur="addRegistry" placeholder="输入verdaccio仓库地址,多个仓库请回车" multi-line v-model="registrys" :rows="registrysLength"></mu-text-field>
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
      // 私有模式
      privateMode: false,
      // 窗口顶置
      alwaysOnTop: false,
      // 镜像地址
      registrys: ''
    }
  },
  computed: {
    registrysLength() {
      return this.registrys.split(/[(\r\n)\r\n]+/).length
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
    privateMode(val) {
      this.$funtask.config.set({
        app: {
          privateMode: val
        }
      })
      this.$countly.$emit('system-setting-privateMode', {
        val
      })
    }
  },
  methods: {
    async getConfig() {
      const config = await this.$funtask.config.get()
      this.autostart = config.app.autostart
      this.registrys = config.app.registrys instanceof Array ? config.app.registrys.join('\n') : ''
      this.privateMode = config.app.privateMode || false
      // console.log(config.app.registrys, 'this.registrys')
      this.alwaysOnTop = config.app.window.alwaysOnTop
    },
    // 添加私有仓库
    addRegistry(e) {
      let rows = this.registrys.split(/[(\r\n)\r\n]+/)
      // 去重去空
      rows = _.compact(_.uniq(rows))
      this.registrys = rows.join('\n')
      this.$funtask.config.set({
        app: {
          registrys: rows
        }
      })
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
