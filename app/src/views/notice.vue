<template>
<div class="funtask-notice">
  <div class="message-box">
    <dl>
      <dt>
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588794868821&di=8c356c2f9ceef9803bd612c5c65c8d5c&imgtype=0&src=http%3A%2F%2Fpic15.nipic.com%2F20110630%2F7688891_130841059318_2.jpg"
          alt="">
      </dt>
      <dd>
        <h5>应用程序用户模型</h5>
        <p>Windows 7和更高版本系统中的任务栏广泛使用应用程序用户模型ID，以将进程，文件和窗口与特定应用程序相关联</p>
      </dd>
    </dl>
  </div>
</div>
</template>

<script>
// import {
//   ipcRenderer
// } from 'electron'
export default {
  data() {
    return {

    }
  },
  mounted() {},
  watch: {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.funtask-notice {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .message-box {
        position: relative;
        right: 8vw;
        width: 80vw;
        height: 58vh;
        background: rgba(0,0,0,0.68);
        padding: 3.6vw;
        box-sizing: border-box;
        color: #fff;
        dl {
            margin: 0;
            padding: 0;
            display: flex;
            box-sizing: border-box;
            align-items: top;
            dd,
            dt {
                margin: 0;
                padding: 0;

            }
            dd {
                padding: 0 3vw;
                font-size: 14px;
                text-align: justify;
                line-height: 21.99px;
            }
            img {
                width: 22.68vw;
                min-width: 22.68vw;
                height: 22.68vw;
                min-height: 22.68vw;
                object-fit: cover;
            }
            h5 {
                margin: 0;
                font-size: 16px;
            }
            p {
                font-size: 14px;
            }
        }
    }
}
</style>
