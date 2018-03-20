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
@font-face{
    font-family: 'NintendoNES';
    src: url('assets/fonts/nintendo-nes-webfont/nintendo-nes-webfont.eot'); /* IE9 */
    src: url('assets/fonts/nintendo-nes-webfont/nintendo-nes-webfont.eot?#iefix') format('embedded-opentype'), /* IE6-8 */
    url('assets/fonts/nintendo-nes-webfont/nintendo-nes-webfont.woff2') format('woff2'), /* Современные браузеры */
    url('assets/fonts/nintendo-nes-webfont/nintendo-nes-webfont.woff') format('woff'),
    url('assets/fonts/nintendo-nes-webfont/nintendo-nes-webfont.ttf') format('truetype'), /* Safari, Android, IOS */
    url('assets/fonts/nintendo-nes-webfont/nintendo-nes-webfont.svg#webfont') format('svg'); /* Устаревший IOS */
}

body {
    background: #000;
    height: 100vh;
    margin: 0;
    padding: 0;
}

#logo img {
    width: 600px;
    height: auto;
}

#app {
    box-sizing: border-box;
    font-family: 'NintendoNES', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding: 20px 0;
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>
