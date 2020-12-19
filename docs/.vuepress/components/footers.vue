<template>
<section class="funtask-footer">
  <div class="container">
    <p>
      友情链接：<a target="_blank"
        href="//funtask.club">Funtask 社区</a> | <a target="_blank"
        href="//xnit.funtask.club">西南IT 社区</a> | <a target="_blank"
        href="//suwis.com">SUWIS</a>
    </p>
    <p>
      MIT Licensed | Copyright © 2019 ~ {{year}} - CTI - Technology Group
    </p>
  </div>
</section>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    }
  },
  methods: {

  }
}
</script>
<style lang="scss">
.funtask-footer {
    position: relative;
    background: #FC601D;
    text-align: center;
    color: #fff;
    padding: 2vw 0;
    font-size: 14px;
    a {
        color: #fff;
    }
}
@media (max-width: 728px) {
    .funtask-footer {
        font-size: 12px;
    }
}
</style>
