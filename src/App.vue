<template>
  <div id="app">
    <div id="logo">
      <img src="./assets/images/bdd_logo.gif">
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@@font-face {
  font-family: "NintendoNES";
  src: url('assets/fonts/nintendo_nes_font.ttf') format('ttf');
}

body {
  background: #000;
  height: 100vh;
  margin: 0;
  padding: 0;
}

#app {
  box-sizing: border-box;
  font-family: 'NintendoNES', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 40px 0;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
