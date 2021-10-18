<template>
<section class="funtask-index">
  <kv></kv>
  <about></about>
  <cooperative-office></cooperative-office>
  <autom-factory></autom-factory>
  <wisdom-agriculture></wisdom-agriculture>
  <social-contact></social-contact>
  <footers></footers>
</section>
</template>
<script>

</script>
<style lang="scss">
body {
    use-select: none;
}

.home {
    max-width: 100%;
    padding-left: 0;
    padding-right: 0;
}
.funtask-index {
    position: relative;
    .container {
        max-width: 62.8vw;
        margin: auto;
    }
    img {
        pointer-events: none;
    }
}
@media (max-width: 720px) {
    .funtask-index {
        position: relative;
        .container {
            max-width: calc(100% - 30px);
            margin: auto;
        }
    }
}
</style>
