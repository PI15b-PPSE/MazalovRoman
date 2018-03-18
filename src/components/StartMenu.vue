<template>
  <div class="menu">
    <component v-bind:is="currentPage"></component>
  </div>
</template>

<script>
import StartMenuPage1 from './StartMenuPage1'
import StartMenuPage2 from './StartMenuPage2'

export default {
  name: 'StartMenu',
  data () {
    return {
      currentPage: 'StartMenuPage1'
    }
  },
  methods: {
    nextPage (e) {
      if (e.keyCode === 13) {
        this.currentPage = 'StartMenuPage2'
      }
    }
  },
  mounted () {
    var audio = new Audio(require('../assets/sounds/bdd_menu_intro.mp3'))
    audio.loop = true
    audio.play()
  },
  created () {
    window.addEventListener('keypress', this.nextPage)
  },
  components: {
    StartMenuPage1,
    StartMenuPage2
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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
</style>
