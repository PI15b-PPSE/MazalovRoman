<template>
    <div id="content"></div>
</template>

<script>
import Game from '../../game'

export default {
    name: 'game',
    data () {},
    methods: {},
    created () {
        window.game = new Game()
    },
    destroyed () {
        window.game.destroy()
    }
}
</script>

<style>
    #content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>
