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
        this.isSpawnStarted = false
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

        this.spawnTimer = this.game.time.create(false)
        this.spawnTimer.loop(1000, this.spawn, this)
        this.skipIterations = 4

        this.lootSprite = this.game.add.sprite(0, 0.67 * this.game.world.height, 'test', 'stage2/loot')
        this.lootSprite.scale.setTo(this.scaleFactor)
        this.game.physics.enable(this.lootSprite)
        // this.lootSprite.visible = false
        this.lootSprite.body.setSize(10, 10, 10, 20)
        this.lootSprite.renderable = false

        this.bigObstacle = this.game.add.sprite(0, 0.67 * this.game.world.height, 'battletoads', 'stage2/enemies/obstacles/big/normal')
        this.bigObstacle.scale.setTo(this.scaleFactor)
        this.game.physics.enable(this.bigObstacle)
        // this.lootSprite.visible = false
        this.bigObstacle.body.setSize(this.bigObstacle.width / this.scaleFactor, 15, 0, 15)
        this.bigObstacle.renderable = false

        this.smallObstacles = this.game.add.group()
        this.smallObstacles.enableBody = true

        let obstacle = this.smallObstacles.create(0, 0.6 * this.game.world.height, 'battletoads', 'stage2/enemies/obstacles/small/normal')
        obstacle.scale.setTo(this.scaleFactor)
        obstacle = this.smallObstacles.create(0, 0.63 * this.game.world.height, 'battletoads', 'stage2/enemies/obstacles/small/normal')
        obstacle.scale.setTo(this.scaleFactor)
        obstacle = this.smallObstacles.create(0, 0.66 * this.game.world.height, 'battletoads', 'stage2/enemies/obstacles/small/normal')
        obstacle.scale.setTo(this.scaleFactor)
        obstacle = this.smallObstacles.create(0, 0.69 * this.game.world.height, 'battletoads', 'stage2/enemies/obstacles/small/normal')
        obstacle.scale.setTo(this.scaleFactor)
        this.lastSmallObstacle = this.smallObstacles.create(0, 0.72 * this.game.world.height, 'battletoads', 'stage2/enemies/obstacles/small/normal')
        this.lastSmallObstacle.scale.setTo(this.scaleFactor)
        this.smallObstacles.visible = false

        this.lootCounter = 9
        this.bigObstacleCounter = 4
        this.smallObstacleCounter = 2
        this.waveCount = 3
    }

    update() {
        // this.background.tilePosition.x -= 1
        this.game.physics.arcade.collide(this.player, this.ground)
        this.game.physics.arcade.collide(this.player, this.car, this.carOverlap, null, this)
        this.game.physics.arcade.overlap(this.player, this.lootSprite, this.lootOverlap, null, this)
        this.game.physics.arcade.collide(
            this.player, this.bigObstacle,
            this.obstacleOverlap, null, this,
        )
        this.game.physics.arcade.collide(
            this.player, this.smallObstacles,
            this.obstacleOverlap, null, this,
        )

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

        if (this.player.isOnCar() && !this.isSpawnStarted) {
            this.player.body.setSize(50, 15, 0, 7)
            this.spawnTimer.start()
        }

        if (!this.player.isOnCar() && this.isSpawnStarted) {
            this.spawnTimer.stop()
        }
    }

    obstacleOverlap() {
        this.game.gameOver()
    }

    lootOverlap() {
        this.lootSprite.renderable = false
    }

    carOverlap() {
        this.floor.animations.play('moving')
        this.background.autoScroll(-80, 0)
        this.player.onCar()
        this.car.destroy()
        this.ground.y = 0.78 * this.game.world.height
    }

    spawn() {
        if (this.skipIterations <= 0) {
            if (this.waveCount > 0) {
                if (this.lootCounter > 0) {
                    if (this.lootSprite.x <= 0) {
                        const y = Math.random() < 0.5 ? 0.67 * this.game.world.height :
                            0.56 * this.game.world.height
                        this.lootSprite.x = this.game.world.width - 50
                        this.lootSprite.y = y
                        this.lootSprite.body.velocity.x = -500
                        this.lootSprite.renderable = true
                        this.lootCounter -= 1
                    }
                    return
                }

                if (this.bigObstacleCounter > 0) {
                    if (this.bigObstacle.x <= 0) {
                        const y = Math.random() < 0.5 ? 0.67 * this.game.world.height :
                            0.56 * this.game.world.height
                        this.bigObstacle.x = this.game.world.width - 50
                        this.bigObstacle.y = y
                        this.bigObstacle.body.velocity.x = -500
                        this.bigObstacle.renderable = true
                        this.bigObstacleCounter -= 1
                    }
                    return
                }

                if (this.smallObstacleCounter > 0) {
                    if (this.lastSmallObstacle.x <= 0) {
                        let offset = 0
                        this.smallObstacles.forEach(function (item) {
                            item.x = this.game.world.width - 50 + offset
                            item.body.velocity.x = -500
                            offset += 10
                        }, this)
                        this.smallObstacles.visible = true
                        this.smallObstacleCounter -= 1
                    }
                } else {
                    this.waveCount -= 1

                    if (this.waveCount > 1) {
                        this.lootCounter = 9
                        this.bigObstacleCounter = 6
                        this.smallObstacleCounter = 3
                    } else if (this.waveCount === 1) {
                        this.lootCounter = 20
                    } else {
                        this.skipIterations = 4
                    }
                }
            } else {
                this.game.playerWon()
            }
        } else {
            this.skipIterations -= 1
        }
    }

    render() {
        if (__DEV__) {
            this.game.debug.spriteInfo(this.lootSprite, 32, 32)
            //this.game.debug.body(this.player)
            this.game.debug.body(this.lootSprite)
            this.game.debug.body(this.bigObstacle)

            this.smallObstacles.forEach(function (item) {
                this.game.debug.body(item)
            }, this)
        }
    }
}
