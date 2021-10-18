<template>
<div class="funtask-notice" :class="{'show':show}">
  <div class="message-box" @mouseup="close('custom')">
    <dl>
      <dt>
        <img v-if="msgdata.icon" :src="msgdata.icon" alt="">
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
import electron from '@suwis/funtask/core/utils/electron'
import _ from 'lodash'
import moment from 'moment'
let timer
export default {
  data() {
    return {
      show: false,
      msgdata: {},
      config: {},
      // 消息队列
      queues: []
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
  watch: {
    queues: {
      deep: true,
      handler(val) {
        // 显示队列数据
        if (val.length > 0) this.push()
      }
    }
  },
  mounted() {
    this.getConfig()
    electron.ipcRenderer.on('notice-push-reply', (event, data) => {
      // 将消息缓存到队列中
      this.queues.push(data)
      // 统计推送时间段
      this.$countly.$emit('system-notice-push', {
        date: moment().format('hh:mm:ss a')
      })
    })
  },
  methods: {
    async getConfig() {
      this.config = await this.$funtask.config.get()
    },
    // 推送消息
    push: _.debounce(function() {
      // 获取最后一条消息
      this.msgdata = this.queues[this.queues.length - 1]
      // 显示窗口
      this.show = true
      // 5秒自动消失
      window.clearInterval(timer)
      timer = setTimeout(() => {
        this.show = false
        this.close('system')
      }, this.delay)
    }, 300),
    close(type) {
      this.show = false
      setTimeout(() => {
        electron.ipcRenderer.send('notice-close', {
          show: this.show,
          type,
          key: this.msgdata.key
        })
        // 移除最后一个
        this.queues.pop()
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
                right: 0;
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
                right: -5vw;
            }
        }
    }
}
</style>
