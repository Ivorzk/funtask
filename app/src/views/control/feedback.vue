<template>
<div class="funtask-feedback">
  <ul>
    <li class="col-xs-3">
      <input type="text"
        placeholder="请输入姓名">
      <input type="text"
        placeholder="请输入联系方式">
      <select placeholder="请选择需要反馈的应用">
        <option v-for="app in apps"
          :key="app.name">{{app.name}}</option>
      </select>
    </li>
    <li>
      <textarea name=""
        id=""
        cols="30"
        rows="8"
        placeholder="请输入您的问题，可截图直接粘贴上传"></textarea>
    </li>
    <li class="phones">
      <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593099147246&di=4e24f626b734e70f093ca26f4ef5bcd9&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F14%2F75%2F01300000164186121366756803686.jpg"
        alt="">
      <span class="btn-add-file">+</span>
    </li>
    <li class="btn-group">
      <button>提交</button>
    </li>
  </ul>
</div>
</template>
<script>
export default {
  data() {
    return {
      apps: []
    }
  },
  mounted() {
    this.getApps()
  },
  methods: {
    async getApps() {
      const list = await this.$funtask.app.getApps()
      console.log(list)
      this.apps = list || []
    }
  }
}
</script>
<style lang="scss">
.funtask-feedback {
    box-sizing: border-box;
    padding: 0 5.2vw;
    overflow: auto;
    height: calc(100vh - 6.8vw);
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        li {
            padding: 1.2vw 0;
            display: flex;
            justify-content: space-between;

            &.phones {
                justify-content: flex-start;
            }
        }

    }
    input,
    select,
    textarea {
        width: 100%;
        padding: 8px;
        box-sizing: border-box;
        border: none;
        background: rgba(225,225,225,0.3);
        font-size: 12px;
        flex: 1;
        color: rgba(255,255,255,0.68);
        appearance: none;
    }

    option {
        height: 30px;
        appearance: none;
        color: $funtask-color-primary;
        cursor: pointer;
    }

    textarea {
        min-width: 100%;
    }

    .col-xs-3 > * {
        max-width: calc(33.33% - 1.5vw);
    }

    .btn-add-file,
    img {
        width: 10.8vw;
        height: 10.8vw;
        object-fit: cover;
        cursor: pointer;
        display: inline-flex;
        background: #ccc;
        align-items: center;
        justify-content: center;
        font-size: 6vw;
        margin-left: 2.2vw;
        margin-bottom: 2.2vw;

        &:first-child {
            margin-left: 0;
        }
    }

    .btn-group {
        display: flex;
        justify-content: flex-end;

        button {
            border: none;
            background: $funtask-color-primary;
            padding: 5px 8px;
            color: #fff;
            cursor: pointer;
            min-width: 100px;
        }
    }
}
</style>
