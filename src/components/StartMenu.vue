<template>
  <div class="menu">
    <h2>{{ ultimateTeam }}</h2>
    <div class="menuContent">
    <h3>{{ copyright }}</h3>
      <p v-for="item in menuContent">
        {{ item.text }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StartMenu',
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
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
