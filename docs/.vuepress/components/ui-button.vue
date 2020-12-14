<template>
<button class="ui-button">
  <slot></slot>
</button>
</template>
<style lang="scss">
.ui-button {
  background: #FC601D;
  border: none;
  border-radius: 5px;
  padding: 0.6vw 3vw;
  color: #fff;
  cursor: pointer;

  &:hover {
    background: #FC601E;
  }
}
</style>
