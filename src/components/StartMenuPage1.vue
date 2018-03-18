<template>
  <div class='pageContent'>
    <h2>{{ ultimateTeam }}</h2>
    <div class="menuContent">
    <h3>{{ copyright }}</h3>
      <p v-for="item in menuContent" v-bind:key="item.id">
        {{ item.text }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StartMenuPage1',
  data () {
    return {
      ultimateTeam: '- the ultimate team -',
      copyright: '\u00A92018 fuxy',
      menuContent: [
        { text: 'Licensed to tradewest by' },
        { text: 'Rare coin-it, inc.' }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pageContent {
  display: contents;
}

.menuContent {
  position: relative;
  top: 35%;
}
</style>
