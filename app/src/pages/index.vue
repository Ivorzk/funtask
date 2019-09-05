<template lang="html">
  <div class="suwis-index" @click="toggle">
    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566567949052&di=f3a200e2046e4c7778f9adf01b2c81cf&imgtype=0&src=http%3A%2F%2Fpic3.newssc.org%2Fupload%2Fori%2F0003000000000%2F20180622%2F1529676149541.jpg" alt="">
  </div>
</template>

<script>

export default {
  data() {
    return {
      // 控制面板
      control: {}
    }
  },
  mounted() {

  },
  methods: {
    // 切换菜单
    toggle() {
      alert('切换')
      console.log('切换')
    }
  }
}
</script>

<style lang="scss" scoped>
.suwis-index {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: rgba(0,0,0,0.68);
    width: 60px;
    height: 60px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-app-region: drag;
    box-shadow: 0 0 10px 3px rgba(0,0,0,0.3);
    color: red;
    font-size: 18px;

    img {
        width: 60%;
        height: 60%;
        border-radius: 100%;
        object-fit: cover;
        background: #fff;
    }
}
</style>
