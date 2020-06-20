<template>
<div class="funtask-notice-list">
  <div class="item"
    v-for="(item,idx) in list"
    :key="item.key"
    :class="{leave:item.leave}"
    @click="close(idx)">
    <dl>
      <dt>
        <img v-if="item.data.icon"
          :src="item.data.icon"
          alt="">
      </dt>
      <dd>
        <i class="arrow iconfont">&#xe625;</i>
        <h5>{{item.data.title||''}}</h5>
        <p>{{item.data.body||''}}</p>
      </dd>
    </dl>
  </div>
  <!--  -->
  <span v-if="list.length==0"
    class="no-data-tips">没有新通知</span>
</div>
</template>

<script>
export default {
  data() {
    return {
      config: {},
      list: []
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
    // 获取列表
    this.getList()
    window.$axios = this.$axios
  },
  methods: {
    async getConfig() {
      this.config = await this.$funtask.config.get()
    },
    // 获取消息列表
    async getList() {
      const res = await this.$funtask.notice.getList()
      this.list = res || []
    },
    // 关闭消息列表
    async close(idx) {
      this.$set(this.list[idx], 'leave', true)
      // 从本地删除
      setTimeout(() => {
        this.list.splice(idx, 1)
      }, 380)
      // 删除消息
      await this.$funtask.notice.close(this.list[idx])
    }
  }
}
</script>

<style lang="scss" scoped>
.funtask-notice-list {
    width: 100vw;
    height: calc(100vh - 35px + 0.5vw);
    transition: all 0.3s ease;
    overflow: auto;
    padding: 0 1.8vw;
    box-sizing: border-box;
    position: relative;

    .item {
        position: relative;
        box-sizing: border-box;
        color: $funtask-color-primary;
        transform: none;
        cursor: pointer;
        z-index: 86;
        height: 25.8vw;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &.leave {
            animation: itemleave 0.3s ease forwards;
        }

        @keyframes itemleave {
            0% {
                transform: translateX(0);
                z-index: 1;
                opacity: 1;
            }
            99% {
                display: block;
            }
            100% {
                height: 0;
                opacity: 0;
                margin: 0;
                display: none;
            }
        }

        dl {
            position: relative;
            display: flex;
            box-sizing: border-box;
            align-items: top;
            justify-content: flex-start;
            width: 100%;
            height: calc(100% - 2vw);
            padding: 2.8vw;
            background: rgb(29, 29, 29,0.8);
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
                padding: 0 4vw;
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
                color: $funtask-color-primary;
                position: absolute;
                right: 2.8vw;
                top: -1.58vw;
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

    .no-data-tips {
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        color: $funtask-color-primary;
        opacity: 0.68;
    }
}
</style>
