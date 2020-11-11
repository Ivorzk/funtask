<template>
<div class="funtask-settings">
  <mu-container>
    <mu-form label-position="left" label-width="138"
      :model="form">
      <mu-form-item label="开机自动启动">
        <mu-switch v-model="automatic"></mu-switch>
      </mu-form-item>
      <mu-form-item label="窗体固定外层">
        <mu-switch v-model="automatic"></mu-switch>
      </mu-form-item>
    </mu-form>
  </mu-container>
</div>
</template>
<script>
export default {
  data() {
    return {
      form: {},
      automatic: false
    }
  }
}
</script>
<style lang="scss" scoped>
.funtask-settings {
    display: flex;
    justify-content: center;
    height: calc(100vh - 6.8vw);
    color: $funtask-color-primary;

    .mu-form-item {
        color: #fff;
    }
}
</style>
