<template>
    <div id="content"></div>
</template>

<script>
import Game from '../../game'

export default {
    name: 'game',
    data () {
        return {}
    },
    methods: {
        gameOver() {
            window.game.destroy()
            this.$parent.switchPage('GameOver')
        },
        playerWon() {
            window.game.destroy()
            this.$parent.switchPage('PlayerWon')
        }
    },
    mounted () {
        const character = this.$parent.selectedCharacter >= 3 ? 'billy' : 'rash'
        window.game = new Game(this.gameOver, this.playerWon, character)
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
