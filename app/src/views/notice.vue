<template>
<div class="funtask-notice"
  :class="{'show':show}">
  <div class="message-box"
    @mouseup="close('custom')">
    <dl>
      <dt>
        <img v-if="msgdata.icon"
          :src="msgdata.icon"
          alt="">
      </dt>
      <dd>
        <i class="arrow iconfont">&#xe625;</i>
        <h5>{{msgdata.title||''}}</h5>
        <p>{{msgdata.body||''}}</p>
      </dd>
    </dl>
  </div>
</div>
</template>

<script>
import {
  ipcRenderer
} from 'electron'
let timer
export default {
  data() {
    return {
      show: false,
      msgdata: {},
      config: {}
    }
  },
  computed: {
    delay() {
      if (this.config.app && this.config.app.notice) {
        return this.config.app.notice.delay || 5000
      }
      return 5000
    }
  },
  mounted() {
    this.getConfig()
    ipcRenderer.on('notice-push-reply', (event, data) => {
      this.msgdata = data
      this.show = true
      window.clearInterval(timer)
      // 5秒自动消失
      timer = setTimeout(() => {
        this.close('system')
      }, this.delay)
    })
  },
  methods: {
    async getConfig() {
      this.config = await this.$funtask.config.get()
    },
    close(type) {
      this.show = false
      setTimeout(() => {
        ipcRenderer.send('notice-close', {
          show: this.show,
          type
        })
      }, 398)
    }
  }
}
</script>

<style lang="scss" scoped>
.funtask-notice {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    transition: all 0.3s ease;
    transform: translateX(100vw);

    &.show {
        transform: none;
    }

    .message-box {
        position: relative;
        right: 13.9px;
        width: calc(100vw - 28px);
        height: calc(100vh - 28px);
        background: rgba(0,0,0,0.68);
        padding: 3.28vw;
        box-sizing: border-box;
        color: #fff;
        transform: none;

        dl {
            margin: 0;
            padding: 0;
            display: flex;
            box-sizing: border-box;
            align-items: top;
            justify-content: flex-start;
            dd,
            dt {
                margin: 0;
                padding: 0;
                flex: 1;
            }
            dt {
                max-width: 16.8vw;
            }
            dd {
                padding: 0 3vw;
                font-size: 14px;
                text-align: justify;
                line-height: 22.8px;
                position: relative;
                max-width: calc(100% - 22vw);
            }
            img {
                width: 16.8vw;
                min-width: 16.8vw;
                height: 16.8vw;
                min-height: 16.8vw;
                object-fit: cover;
                position: relative;
                display: block;
                top: 0.68vw;
                margin-left: 0.5vw;
            }
            h5 {
                position: relative;
                width: 98%;
                margin: 0;
                padding: 0;
                font-size: 16px;
                font-weight: normal;
                margin-bottom: 2vw;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                word-break: break-all;
            }
            .arrow {
                color: #fff;
                position: absolute;
                right: 2.8vw;
                top: -2vw;
                font-weight: lighter;
                font-size: 14px;
                opacity: 0;
                transition: all 0.3s ease;
                z-index: 200;
            }
            p {
                font-size: 14px;
                margin: 0;
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
                width: 100%;
            }
        }

        &:hover {
            .arrow {
                opacity: 1;
                right: 1vw;
            }
        }
    }
}
</style>
