import Phaser from 'phaser'

export default class extends Phaser.State {
    init() {
        this.stage.backgroundColor = '#000'
    }

    preload() {
        this.load.atlas(
            'battletoads',
            './assets/sprites/battletoads.png',
            './assets/sprites/battletoads.json',
            Phaser.Loader.TEXTURE_ATLAS_JSON_JASH,
        )
        this.load.audio('coin', ['/assets/sounds/mario_coin_sound.mp3'])
    }

    render() {
        this.state.start('Game')
    }
}
