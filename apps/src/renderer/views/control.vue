<template>
<div class="suwis-control">
  <div class="fun-list">
    <ul>
      <li v-for="item in 15">
        <i class="iconfont">xxx</i>
        功能
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
    background: rgba(0,0,0,0.8);
    border-radius: 10px;

    .fun-list {
        ul {
            display: flex;
            flex-wrap: wrap;
            list-style: none;
        }

        li {
            max-width: 20%;
            min-width: 20%;
            color: #fff;
            text-align: center;
            padding: 3% 0;
            i {
                display: block;
            }
        }
    }
}
</style>
