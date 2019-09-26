<template>
<div class="suwis-control">
  <div class="search-bar">
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
  </div>
</div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.suwis-control {
    position: relative;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.39);
    // border-radius: 10px;
    overflow: hidden;
    user-select: none;

    .search-bar {
        padding: 15px;
        input {
            box-sizing: border-box;
            width: 100%;
            padding: 9px;
            border: none;
            background: rgba(255,255,255,1);
            border-radius: 3px;
            font-size: 12px;
        }
    }

    .fun-list {
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
