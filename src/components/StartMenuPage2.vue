<template>
  <div class='pageContent'>
    <h2>{{ ultimateTeam }}</h2>
    <div class="menuContent">
      <ul>
        <li>1 player</li>
      </ul>
      <p id="press-enter">Press Enter</p>
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

#press-enter {
  color: #8B8710;
  animation: pulseFading 1s cubic-bezier(1,0,1,0) infinite;
}

@keyframes pulseFading {
  0% {opacity: 0.0;}
  50% {opacity: 1.0;}
  100% {opacity: 0.0;}
}
</style>
