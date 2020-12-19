<template>
<section class="funtask-social-contact">
  <div class="container">
    <a href="javascript:;">
      <img src="icon_wx.png"
        alt="">
      <span class="mask">
        <img src="qrcode_wx.jpg"
          alt="">
      </span>
    </a>
    <a href="#"
      disabled>
      <img src="icon_sina.png"
        alt="">
    </a>
    <a href="#"
      disabled>
      <img src="icon_zhihu.png"
        alt="">
    </a>
    <a href="#"
      disabled>
      <img src="icon_linyin.png"
        alt="">
    </a>
    <a href="#"
      disabled>
      <img src="icon_toutiao.png"
        alt="">
    </a>
  </div>
</section>
</template>
<script>
export default {
  methods: {

  }
}
</script>
<style lang="scss">
.funtask-social-contact {
    padding: 1vw 0 3.9vw;
    .container {
        display: flex;
        justify-content: flex-end;
    }
    a {
        cursor: pointer;
        display: inline-block;
        margin: 0 10px;
        position: relative;

        img {
            display: block;
        }

        &:last-child {
            margin-right: 0;
        }

        &[disabled] {
            filter: grayscale(100%);
            pointer-events: none;
        }
        &:hover {
            .mask {
                opacity: 1;
                margin-top: -9px;
                pointer-events: auto;
            }
        }
    }

    .mask {
        position: absolute;
        left: 50%;
        transform: translate(-50%,-168px);
        background: #fff;
        border: 1px solid #ccc;
        opacity: 0;
        transition: all 0.3s ease;
        pointer-events: none;
        margin-left: -3px;
        &:after {
            position: absolute;
            content: '';
            width: 12px;
            height: 12px;
            display: inline-block;
            transform: rotate(45deg) translateX(-50%);
            bottom: -12px;
            left: 50%;
            border: 1px solid #ccc;
            background: #fff;
            border-left-color: transparent;
            border-top-color: transparent;
        }
        img {
            min-width: 128px;
            max-width: 128px;
            display: block;
        }
    }

    img {
        width: 2vw;
        pointer-events: none;
    }
}
@media (max-width: 728px) {
    .funtask-social-contact {
        padding: 8vw 0;
        .container {
            justify-content: center;
        }
        a {
            margin: 0 8px;
        }
        img {
            width: 6.28vw;
        }
    }
}
</style>
