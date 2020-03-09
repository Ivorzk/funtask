<template>
<div class="funtask-appstore">
  <input class="search-input"
    v-model="keywords"
    type="text"
    placeholder="请输入关键字">
  <div class="app-list">
    <dl v-for="(item,idx) in apps"
      :key="idx">
      <dt>{{item.name}}</dt>
      <dd>{{item.description}}</dd>
      <dd><label v-for="key in item.keywords"
          :key="key">{{key}}</label></dd>
      <dd class="between">
        <span>
          <img class="avatar"
            src="https://s.gravatar.com/avatar/d58973c038d271823c09420d1a0bb64e?size=100&default=retro"
            alt="">
          {{item.publisher.username}} 发布版本 v{{item.version}} • &nbsp;&nbsp;于{{item.date|timediff}}前
        </span>
        <span class="btn-group">
          <button><i class="iconfont">&#xe71f;</i><i v-if="false"
              class="iconfont">&#xe640;</i>安装</button>
          <!-- <button><i class="iconfont">&#xe63a;</i>设置</button>
          <button><i class="iconfont">&#xe619;</i>删除</button> -->
          <!-- <button><i class="iconfont">&#xe61c;</i>启用</button>
          <button><i class="iconfont">&#xe76a;</i>禁用</button> -->
        </span>
      </dd>
    </dl>
  </div>
</div>
</template>
<script>
import _ from 'lodash'
export default {
  data() {
    return {
      // 关键字
      keywords: '',
      apps: []
    }
  },
  mounted() {
    this.getApps()
  },
  watch: {
    keywords: _.debounce(function() {
      this.getApps()
    }, 300)
  },
  filters: {
    timediff(val) {
      var startDate = new Date(val)
      var endDate = new Date()
      // 时间差的毫秒数
      var diff = endDate.getTime() - startDate.getTime()

      // 计算出相差天数
      var days = Math.floor(diff / (24 * 3600 * 1000))

      // 计算出小时数
      var leave1 = diff % (24 * 3600 * 1000)
      // 计算天数后剩余的毫秒数
      var hours = Math.floor(leave1 / (3600 * 1000))
      // 计算相差分钟数
      var leave2 = leave1 % (3600 * 1000)
      // 计算小时数后剩余的毫秒数
      var minutes = Math.floor(leave2 / (60 * 1000))

      // 计算相差秒数
      var leave3 = leave2 % (60 * 1000)
      // 计算分钟数后剩余的毫秒数
      var seconds = Math.round(leave3 / 1000)

      if (days > 0) {
        if (days > 365) return Math.floor(days / 365) + '年'
        if (days > 30) return Math.floor(days / 30) + '个月'
        return days + '天'
      }
      if (hours > 0) {
        return hours + '小时'
      }
      if (minutes > 0) {
        return minutes + '分'
      }
      if (seconds > 0) {
        return seconds + '秒'
      }
    }
  },
  methods: {
    // 获取应用
    async getApps() {
      let res = await this.$axios.get(`https://www.npmjs.com/search/suggestions?q=funtask-${this.keywords}`)
      this.apps = res.data || []
    }
  }
}
</script>
<style lang="scss">
.funtask-appstore {
    position: relative;
    height: calc(100vh - 36px);
    overflow: auto;
    color: $funtask-text-color-inverse;
    padding: 0 $funtask-spacing-row-base $funtask-spacing-row-lg;
    font-size: $funtask-font-size-base;

    .search-input {
        width: 100%;
        border: none;
        border-bottom: 2px solid rgba($funtask-color-primary,0.6);
        background: transparent;
        color: $funtask-text-color-inverse;
        padding: $funtask-spacing-col-base 0;
        margin-bottom: $funtask-spacing-col-lg;
        transition: all 0.3s ease;

        &:focus {
            border-color: rgba($funtask-color-primary,1);
        }
    }

    .app-list {
        dl {
            background: rgba(0,0,0,0.28);
            padding: $funtask-spacing-row-base $funtask-spacing-row-lg;
            border-radius: $funtask-border-radius-sm;
            &:first-child {
                margin-top: 0;
            }

            dd,
            dt {
                margin: 0;
                padding: $funtask-spacing-col-sm 0;
                display: flex;
                align-items: center;

                &.between {
                    justify-content: space-between;
                }
            }
            dt {
                color: $funtask-color-primary;
                font-size: $funtask-font-size-lg;
            }

            dd {
                label {
                    background: rgba($funtask-color-primary, 0.58);
                    padding: $funtask-spacing-col-sm * 0.5 $funtask-spacing-row-sm;
                    border-radius: $funtask-border-radius-sm * 0.5;
                    margin-right: $funtask-spacing-row-base;
                    color: rgba($funtask-text-color-inverse, 0.68);
                }
            }
        }
        .avatar {
            max-width: 16px;
            border-radius: $funtask-border-radius-sm / 2;
            margin-right: $funtask-spacing-row-sm;
            vertical-align: top;
            display: inline-block;
        }
        button {
            background: transparent;
            border: none;
            padding: $funtask-spacing-col-sm $funtask-spacing-row-sm;
            color: $funtask-color-primary;
            cursor: pointer;
            margin-left: $funtask-spacing-row-base;
            display: flex;
            align-items: center;

            .iconfont {
                margin-right: $funtask-spacing-row-sm * 0.8;
            }
        }
    }
}
</style>
