/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'

export default class extends Phaser.State {
    init() {
        console.log(this.world)
    }

    preload() {
        console.log(this.world)
    }

    create() {
        // sprite hook determining it's width
        const sprite = new Phaser.Sprite(
            this.game, 0, 0,
            'battletoads', 'stage2/1',
        )
        this.scaleFactor = this.game.world.height / sprite.height

        this.background = this.game.add.tileSprite(
            0, 0, this.game.world.width, this.game.world.height,
            'battletoads', 'stage2/1',
        )
        this.background.scale.setTo(this.scaleFactor)

        this.game.physics.startSystem(Phaser.Physics.ARCADE)
        // this.game.physics.arcade.gravity.y = 100

        const platforms = this.game.add.group()
        platforms.enableBody = true
        this.ground = platforms.create(0, 0.81 * this.game.world.height)
        this.ground.height = this.game.world.height - (0.82 * this.game.world.height)
        this.ground.width = this.game.world.width
        this.ground.body.immovable = true

        this.player = new Player({
            game: this.game,
            x: 0,
            y: 0,
            asset: 'battletoads',
            scale: this.scaleFactor,
            ground: this.ground,
        })

        this.floor = this.game.add.sprite(0, 0.68 * this.game.world.height, 'battletoads', 'stage2/floor/0')
        this.floor.scale.setTo(this.scaleFactor)
        this.floor.width = this.game.world.width
        this.floor.animations.add(
            'moving',
            Phaser.Animation.generateFrameNames('stage2/floor/', 0, 7),
            15,
            true,
        )
        // floor.animations.play('moving')
        // this.background.autoScroll(-80, 0)
        this.game.add.existing(this.player)

        this.car = this.game.add.sprite(this.game.world.width / 2, 0.65 * this.game.world.height, 'battletoads', 'stage2/enemies/car')
        this.game.physics.enable(this.car)
        this.car.body.immovable = true
        this.car.scale.setTo(this.scaleFactor)
    }

    update() {
        // this.background.tilePosition.x -= 1
        this.game.physics.arcade.collide(this.player, this.ground)
        this.game.physics.arcade.collide(this.player, this.car, this.carOverlap, null, this)

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.player.moveLeft()
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.player.moveRight()
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            this.player.moveUp()
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            this.player.moveDown()
        } else {
            this.player.stop()
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.player.jump()
        }
    }

    carOverlap() {
        this.floor.animations.play('moving')
        this.background.autoScroll(-80, 0)
        this.player.onCar()
        this.car.destroy()
    }

    render() {
        if (__DEV__) {
            this.game.debug.spriteInfo(this.background, 32, 32)
        }
    }
}
