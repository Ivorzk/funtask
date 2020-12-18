<template>
<section class="funtask-social-contact">
  <div class="container">
    <a href="#">
      <img src="icon_wx.png"
        alt="">
    </a>
    <a href="#">
      <img src="icon_sina.png"
        alt="">
    </a>
    <a href="#">
      <img src="icon_zhihu.png"
        alt="">
    </a>
    <a href="#">
      <img src="icon_linyin.png"
        alt="">
    </a>
    <a href="#">
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

        &:last-child {
            margin-right: 0;
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
