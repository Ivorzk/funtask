<template>
<section class="funtask-index">
  <kv></kv>
  <about></about>
  <wisdom-agriculture></wisdom-agriculture>
  <autom-factory></autom-factory>
  <cooperative-office></cooperative-office>
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
        max-width: 62.5vw;
        margin: auto;
    }

}
@media (max-width: 1440px) {
    .funtask-index {
        position: relative;
        .container {
            max-width: 69vw;
            margin: auto;
        }
    }
}
</style>
