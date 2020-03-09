<template>
<div class="funtask-appstore">
  <div class="app-list">
    <dl v-for="(item,idx) in 10"
      :key="idx">
      <dt>funtask-translate</dt>
      <dd>集成有道翻译、百度翻译、和谷歌翻译的Funtask插件</dd>
      <dd><label>funtask</label><label>translate</label></dd>
      <dd class="between">
        <span>
          <img class="avatar"
            src="https://s.gravatar.com/avatar/d58973c038d271823c09420d1a0bb64e?size=100&default=retro"
            alt="">
          ivorzk published 1.0.1 • 5 days ago{{item}}
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
export default {
  data() {
    return {}
  },
  methods: {}
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
