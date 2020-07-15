<template>
<div class="funtask-feedback">
  <ul>
    <li>
      <input type="text"
        placeholder="请输入姓名">
      <input type="text"
        placeholder="请输入联系方式">
    </li>
    <li>
      <textarea name=""
        id=""
        cols="30"
        rows="14"></textarea>
    </li>
    <li class="btn-group">
      <button>提交</button>
    </li>
  </ul>
</div>
</template>
<script>

</script>
<style lang="scss">
.funtask-feedback {
    box-sizing: border-box;
    padding: 0 5.2vw;
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        li {
            padding: 2vw 0;
            display: flex;
            justify-content: space-between;
        }
    }
    input,
    textarea {
        width: 100%;
        padding: 8px 8px;
        box-sizing: border-box;
        border: none;
        background: rgba(255, 255,255,0.8);
        font-size: 12px;
    }

    input {
        width: 48%;
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
