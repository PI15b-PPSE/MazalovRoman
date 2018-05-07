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
            this.audio.pause()
        },
        playerWon() {
            window.game.destroy()
            this.$parent.switchPage('PlayerWon')
            this.audio.pause()
        }
    },
    mounted () {
        const character = this.$parent.selectedCharacter >= 3 ? 'billy' : 'rash'
        window.game = new Game(this.gameOver, this.playerWon, character)
        this.audio = new Audio(require('../../../assets/sounds/level2.mp3'))
        this.audio.loop = true
        this.audio.play()
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
