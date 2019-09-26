<template>
<div class="suwis-control">
  <div class="bg"></div>
  <div class="wrapper">
    <div class="header"></div>
    <!--  -->
    <span @click="toggle" class="btn-toggle iconfont">&#xe67c;</span>
    <!--  -->
    <!-- <div class="search-bar">
        <input type="text" name="" value="">
      </div>
      <div class="fun-list">
        <ul>
          <li v-for="item in 15">
            <span>
              <i class="iconfont">&#xe610;</i>
              功能
            </span>
          </li>
        </ul>
      </div> -->
  </div>
</div>
</template>

<script>
import {
  ipcRenderer
} from 'electron'
export default {
  methods: {
    toggle() {
      ipcRenderer.send('control-toggle', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.suwis-control {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    user-select: none;
    // border-radius: 6px;
    background: rgba(0, 0, 0, 0.69);

    .bg {
        position: absolute;
        width: 100vw;
        height: 100vh;
        left: 0;
        top: 0;
        margin: 0 auto;
        background: rgba(0, 0, 0, 1) url("./../assets/control_bg.jpg") no-repeat center/cover;
        overflow: hidden;
        filter: blur(39px);
        opacity: 0.39;
        z-index: 0;
    }

    .wrapper {
        position: relative;
        z-index: 99;
    }

    .header {
        height: 36px;
        -webkit-app-region: drag;
        width: calc(100% - 45px);
    }

    .btn-toggle {
        position: absolute;
        right: 12px;
        top: 6px;
        color: rgba(255, 255, 255, 0.8);
        font-size: 23px;
        cursor: pointer;
        opacity: 0.6;
        z-index: 99;

        &:hover {
            opacity: 1;
        }
    }

    .search-bar {
        padding: 20px;
        position: relative;
        z-index: 10;

        input {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            padding: 9px;
            border: none;
            background: rgba(255, 255, 255, 1);
            border-radius: 3px;
            font-size: 12px;
        }
    }

    .fun-list {
        position: relative;
        z-index: 10;

        ul {
            display: flex;
            flex-wrap: wrap;
            list-style: none;
            margin: 0;
            padding: 0;
            height: calc(100vh - 80px);
        }

        li {
            max-width: 20%;
            min-width: 20%;
            color: #fff;
            text-align: center;
            height: 33.33%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            font-size: 12px;
            line-height: 28px;

            i {
                display: block;
                flex: 1;
                font-size: 28px;
                font-style: normal;
            }
        }
    }
}
</style>
