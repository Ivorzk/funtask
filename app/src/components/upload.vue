<template>
<div class="funtask-upload"
  :class="{uploading:uploading}"
  @click="select">
  <slot>
    <button>点击上传</button>
  </slot>
  <form ref="form">
    <input @change="upload"
      ref="file"
      name="file"
      class="file"
      type="file">
  </form>
  <div class="mask"
    v-if="uploading">
    <div>
      <svg viewBox="0 0 100 100">
        <path d="M 50 50 m -40 0 a 40 40 0 1 0 80 0  a 40 40 0 1 0 -80 0"
          fill="none"
          stroke-width="3">
          ></path>
        <path d="M 50 50 m -40 0 a 40 40 0 1 0 80 0  a 40 40 0 1 0 -80 0"
          fill="none"
          stroke-linecap="round"
          class="svg-path"
          transform="rotate(90,50,50)"
          stroke-width="3"
          :stroke-dashoffset="percent*252.2+'px'">
        </path>
      </svg>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      percent: 0,
      uploading: false
    }
  },
  watch: {
    uploading(val) {
      if (!val) this.percent = 0
    }
  },
  methods: {
    // 选择图片
    select() {
      this.$refs.file.click()
    },
    // 上传
    upload() {
      this.uploading = true
      var xhr = new XMLHttpRequest()
      xhr.open('post', $config.uploadhost + '/jsonapi/io/upload')
      xhr.onload = (event) => {
        this.uploading = false
        let data
        try {
          data = JSON.parse(event.target.response)
          if (data.errno === 0) {
            this.$emit('on-success', data.data)
          } else {
            this.$emit('on-error', data)
          }
        } catch (e) {
          this.$emit('on-error', event.target.response)
        }
      }
      // 进度监测
      xhr.upload.onprogress = (event) => {
        this.percent = event.loaded / event.total
      }
      var data = new FormData(this.$refs.form)
      xhr.send(data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.funtask-upload {
    position: relative;
    &.uploading {
        pointer-events: none;
    }
    .file {
        display: none;
    }
    .mask {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 200;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0,0,0,0.69);

        > div {
            width: 80%;
            height: 80%;
        }

        svg {
            path:first-child {
                stroke: $funtask-color-primary;
            }
            path:last-child {
                stroke: $funtask-text-color-disable;
            }
        }

        .svg-path {
            stroke-dasharray: 252.2px, 252.2px;
            transition: stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease 0s;
            transform: rotateZ(90deg);
            transform-origin: 50% 50%;
        }
    }
}
</style>
