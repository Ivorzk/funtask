<template>
<div class="funtask-window-header">
  <div class="topbar"></div>
  <div class="btn-group">
    <span @click="btnClick('min')"
      class="btn toggle iconfont">&#xe63e;</span>
    <span @click="btnClick('settings')"
      class="btn menu iconfont">&#xe67c;</span>
  </div>
</div>
</template>

<script>
export default {
  props: {},
  methods: {
    btnClick(type) {
      this.$emit('btn-click', type)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.funtask-window-header {
    .topbar {
        height: $funtask-window-height;
        -webkit-app-region: drag;
        width: calc(100% - 90px);
    }

    .btn-group {
        position: absolute;
        right: 0;
        top: 0;
        color: $funtask-color-primary;
        z-index: 399;
        display: flex;

        &:hover {
            .toggle {
                visibility: visible;
            }
        }

        .iconfont {
            font-size: 1.5rem;
        }
    }

    .btn {
        z-index: 99;
        width: 45px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.6;
        cursor: pointer;
        &:hover {
            background: #333;
            opacity: 1;
        }

        &.toggle {
            visibility: hidden;
        }
    }
}
</style>
