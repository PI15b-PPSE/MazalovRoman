<template>
  <div class="wrapper">
      <div class="header-background">
        <div class="header">

        </div>
        <div class="row">

        </div>
      </div>
      <div class="row footer-background">

      </div>
  </div>
</template>

<script>
export default {
  name: 'StartMenuPage3'
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-flow: column;
  height: 100%;
}

.header {
  flex: 0 1 auto;
}

.header-background {
  display: contents;
  background: url('@/assets/images/page3_tile_1.jpg') repeat;
}

.footer-background {
  background: url('@/assets/images/page3_tile_2.jpg') repeat;
}

.row {
  flex: 1 1 auto;
}
</style>
