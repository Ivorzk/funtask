<template>
<div class="funtask-feedback"
  @paste="paste">
  <ul>
    <li class="col-xs-3">
      <input v-model="formdata.name"
        type="text"
        placeholder="请输入姓名">
      <input v-model="formdata.account"
        type="text"
        placeholder="请输入联系方式">
      <select v-model="currentApp"
        placeholder="请选择需要反馈的应用">
        <option v-for="(app,idx) in apps"
          :value="app.package.name"
          :key="idx">{{app.name}}</option>
      </select>
    </li>
    <li>
      <textarea v-model="formdata.content"
        cols="30"
        rows="8"
        placeholder="请输入您的问题，可截图直接粘贴上传"></textarea>
    </li>
    <li class="thumbs">
      <img :src="url"
        v-for="url in thumbs"
        :key="url">
      <funtask-upload ref="upload"
        @on-success="uploadSuccess"
        class="btn-add-file">
        <span>+</span>
      </funtask-upload>
    </li>
    <li class="btn-group">
      <button @click="submit">提交</button>
    </li>
  </ul>
</div>
</template>
<script>
import electron from '@suwis/funtask/core/utils/electron'
export default {
  data() {
    return {
      // app列表
      apps: [],
      // 当前选择的app
      currentApp: '',
      // 缩略图
      thumbs: [],
      // 表单数据
      formdata: {
        uuid: '',
        name: '',
        account: '',
        appinfo: '',
        thumbs: '',
        content: ''
      }
    }
  },
  mounted() {
    this.getApps()
    // 提取缓存
    this.extractCache()
  },
  watch: {
    currentApp(val) {
      for (const item of this.apps) {
        if (item.package.name === this.currentApp) {
          this.formdata.appinfo = JSON.stringify({
            name: item.package.name,
            version: item.package.version,
            description: item.package.description
          })
          break
        }
      }
    }
  },
  methods: {
    // 获取视频
    async getApps() {
      const list = await this.$funtask.app.getApps()
      this.apps = list || []
      const uuid = await this.$funtask.system.getUUID()
      this.formdata.uuid = uuid
      this.currentApp = list[0].package.name
    },
    extractCache() {
      const res = localStorage.getItem('funtask_feedback_cache')
      if (res) {
        const cache = JSON.parse(res)
        this.formdata.name = cache.name
        this.formdata.account = cache.account
        this.currentApp = cache.currentApp
      }
    },
    // 上传成功
    uploadSuccess(data) {
      this.thumbs.push(data.url)
    },
    // 提交反馈
    async submit() {
      this.formdata.thumbs = this.thumbs.join(',')
      const res = await this.$axios.post('/funtask/feedbacks', this.formdata)
      alert(res.data.errno ? res.data.errmsg : '提交成功！感谢您的宝贵建议')
      if (!res.data.errno) {
        this.cache()
        this.reset()
      }
    },
    // 缓存
    cache() {
      // 本地存储用户名和联系方式
      localStorage.setItem('funtask_feedback_cache', JSON.stringify({
        name: this.formdata.name,
        account: this.formdata.account,
        currentApp: this.currentApp
      }))
    },
    // 鼠标粘贴
    paste() {
      // 尝试读取粘贴板中的图片
      const img = electron.clipboard.readImage()
      if (img.isEmpty()) return
      // console.log(img.toDataURL(), 'img')
      this.$refs.upload.uploadBase64(img.toDataURL())
    },
    // 重置表单
    reset() {
      this.formdata.content = ''
      this.formdata.thumbs = ''
      this.thumbs = []
    }
  }
}
</script>
<style lang="scss">
.funtask-feedback {
    box-sizing: border-box;
    padding: 0 5.2vw;
    overflow: auto;
    height: calc(100vh - 6.8vw);
    ul {
        list-style: none;
        margin: 0 0 2vw;
        padding: 0;
        li {
            padding: 1.2vw 0;
            display: flex;
            justify-content: space-between;

            &.thumbs {
                justify-content: flex-start;
                flex-wrap: wrap;
            }
        }

    }
    input,
    select,
    textarea {
        width: 100%;
        padding: 8px;
        box-sizing: border-box;
        border: none;
        background: rgba(225,225,225,0.218);
        font-size: 12px;
        color: rgba(255,255,255,0.8);
        flex: 1;
        appearance: none;
    }

    option {
        height: 30px;
        appearance: none;
        color: $funtask-color-primary;
        cursor: pointer;
    }

    textarea {
        min-width: 100%;
    }

    .col-xs-3 > * {
        max-width: calc(33.33% - 1.5vw);
    }

    .btn-add-file,
    img {
        width: 10.8vw;
        height: 10.8vw;
        object-fit: cover;
        cursor: pointer;
        display: inline-flex;
        background: rgba(225,225,225,0.218);
        align-items: center;
        justify-content: center;
        font-size: 6vw;
        margin-right: 2.2vw;
        margin-bottom: 2.2vw;
        color: rgba(0, 0, 0, 0.3);
    }

    .btn-group {
        display: flex;
        justify-content: flex-end;

        button {
            border: none;
            background: $funtask-color-primary;
            padding: 6px 8px;
            color: #fff;
            cursor: pointer;
            min-width: 100px;
        }
    }
}
</style>
