<template>
  <div class="menu">
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
  },
  mounted () {
    var audio = new Audio(require('../assets/sounds/bdd_menu_intro.mp3'))
    audio.loop = true
    audio.play()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

.menu {
  flex: 1;
  position: relative;
}

.menu h2 {
  word-spacing: 8px;
  color: #984231;
  text-transform: uppercase;
  font-size: 22px;
}

.menu h3 {
  word-spacing: 8px;
  color: #E5F499;
  text-transform: uppercase;
  font-size: 20px;
}

.menu p {
  margin: 0;
  word-spacing: 8px;
  color: #E5F499;
  text-transform: uppercase;
  font-size: 20px;
}

.menuContent {
  position: relative;
  top: 35%;
}
</style>
