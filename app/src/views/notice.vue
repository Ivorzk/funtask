<template>
<div class="funtask-notice">
  <div class="message-box"
    :class="direction"
    @mouseup="close">
    <div class="mask"
      @mousedown="direction='transform-top'"></div>
    <div class="mask"
      @mousedown="direction='transform-right'"></div>
    <div class="mask"
      @mousedown="direction='transform-bottom'"></div>
    <div class="mask"
      @mousedown="direction='transform-left'"></div>
    <!--  -->
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
      direction: ''
    }
  },
  mounted() {},
  methods: {
    close() {}
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

    .mask {
        position: absolute;
        width: 50%;
        height: 50%;
        z-index: 138;

        &:nth-child(1) {
            width: 44%;
            height: 50%;
            left: 28%;
            top: 0;
        }
        &:nth-child(2) {
            width: 28%;
            height: 100%;
            right: 0;
            top: 0;
        }
        &:nth-child(3) {
            width: 44%;
            height: 50%;
            left: 28%;
            bottom: 0;
        }
        &:nth-child(4) {
            width: 28%;
            height: 100%;
            left: 0;
            top: 0;
        }
    }

    .message-box {
        position: relative;
        right: 13.9px;
        width: calc(100vw - 28px);
        height: calc(100vh - 28px);
        background: rgba(0,0,0,0.68);
        padding: 2.8vw;
        box-sizing: border-box;
        color: #fff;

        transition: all 0.3s ease;
        -webkit-transition: all 0.6s ease;
        transform: none;

        &:active.transform-top {
            transform-origin: 50% bottom;
            -webkit-transform: perspective(900px) rotateX(0.13838372rad) !important;
        }

        &:active.transform-right {
            transform-origin: left 50%;
            -webkit-transform: perspective(900px) rotateY(0.13838372rad) !important;
        }

        &:active.transform-bottom {
            transform-origin: 50% top;
            -webkit-transform: perspective(900px) rotateX(-0.13838372rad) !important;
        }

        &:active.transform-left {
            transform-origin: right 50%;
            -webkit-transform: perspective(900px) rotateY(-0.13838372rad) !important;
        }
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
                line-height: 23.9px;
            }
            img {
                width: 21.39vw;
                min-width: 21.39vw;
                height: 21.39vw;
                min-height: 21.39vw;
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
