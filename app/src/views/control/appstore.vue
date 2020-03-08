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
        <button>安装</button>
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
    padding: 0 $funtask-spacing-row-base * 2 $funtask-spacing-row-lg;
    font-size: $funtask-font-size-base;

    .app-list {
        dl {
            &:first-child {
                margin-top: 0;
            }

            dd,
            dt {
                margin: 0;
                padding: $funtask-spacing-col-base 0;
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
                    background: rgba($funtask-color-primary, 0.69);
                    padding: $funtask-spacing-col-sm * 0.5 $funtask-spacing-row-sm;
                    border-radius: $funtask-border-radius-sm * 0.5;
                    margin-right: $funtask-spacing-row-base;
                    color: rgba($funtask-text-color-inverse, 0.8);
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
            background: $funtask-color-primary;
            border: none;
            padding: $funtask-spacing-col-sm $funtask-spacing-row-sm;
            color: $funtask-text-color-inverse;
            cursor: pointer;
        }
    }
}
</style>
