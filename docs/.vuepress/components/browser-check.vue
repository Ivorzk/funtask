<template>
<div class="funtask-browser-check"
  v-if="oldie">
  <div class="wrapper">
    <dl>
      <dt>
        <img src="browser-face.png"
          alt="browser">
        您当前使用的浏览器版本过低，建议升级浏览器或使用以下推荐的浏览器进行访问
      </dt>
      <dd>
        <a href="https://www.microsoft.com/zh-cn/edge?utm_source=funtask.dev"
          target="_blank">
          <img src="edge-logo.png"
            alt="Edge">
          Edge
        </a>
        <a href="https://www.google.cn/intl/zh-CN/chrome/?utm_source=funtask.dev"
          target="_blank">
          <img src="chrome-logo.png"
            alt="Chrome">
          Chrome
        </a>
        <a href="https://www.firefox.com.cn/?utm_source=funtask.dev"
          target="_blank">
          <img src="firefox-logo.png"
            alt="Firefox">
          Firefox
        </a>
      </dd>
    </dl>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      oldie: false
    }
  },
  mounted() {
    this.oldie = window.navigator.userAgent.indexOf('MSIE') > 0
  }
}
</script>
<style lang="scss" scoped>
.funtask-browser-check {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    background-color: #fff;
    text-align: center;
    display: table;

    .wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    img {
        width: 80px;
        display: block;
        margin: 0 auto;
        height: auto;
        border-style: none;
    }

    dl {
        margin: 0 auto;
        width: 90%;
        max-width: 980px;

        dt {
            font-size: 20px;
            margin-bottom: 99px;

            img {
                margin-bottom: 30px;
            }
        }

        dd {
            text-align: center;
            vertical-align: middle;

            a {
                position: relative;
                display: inline-block;
                width: 32%;
                &:before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 100%;
                    border-left: 1px solid #efefef;
                }
                &:first-child:before {
                    display: none;
                }
            }
        }
    }
}
</style>
