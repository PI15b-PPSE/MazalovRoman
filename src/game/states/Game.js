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
        this.coinSound = this.game.sound.add('coin')
        this.coinSound.volume = 0.4
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
        this.ground.body.allowGravity = false

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
        const playerShadow = this.game.add.sprite(0, 0.73 * this.game.world.height, 'battletoads', 'shadow/big')
        playerShadow.scale.setTo(this.scaleFactor)
        this.game.physics.enable(playerShadow)
        this.player = new Player({
            game: this.game,
            x: 100,
            y: 0.4 * this.game.world.height,
            asset: 'battletoads',
            scale: this.scaleFactor,
            ground: this.ground,
            shadow: playerShadow,
            character: this.game.character,
        })
        this.game.add.existing(this.player)

        this.car = this.game.add.sprite(this.game.world.width / 2, 0.65 * this.game.world.height, 'battletoads', 'car')
        this.game.physics.enable(this.car)
        this.car.body.immovable = true
        this.car.scale.setTo(this.scaleFactor)

        this.spawnTimer = this.game.time.create(false)
        this.spawnTimer.loop(1000, this.spawn, this)
        this.skipIterations = 4

        this.lootSprite = this.game.add.sprite(0, 0.73 * this.game.world.height, 'battletoads', 'loot')
        this.lootSprite.scale.setTo(this.scaleFactor)
        this.game.physics.enable(this.lootSprite)
        // this.lootSprite.visible = false
        this.lootSprite.body.setSize(10, 10, 0, 0)
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
        this.isLooted = false
        this.bigObstacleCounter = 4
        this.smallObstacleCounter = 2
        this.waveCount = 3
        this.isObstaclesSpawned = false
        this.waveSpeed = 500

        this.createScoreLabel()
    }

    update() {
        // this.background.tilePosition.x -= 1
        this.game.physics.arcade.collide(this.player, this.ground)
        this.game.physics.arcade.collide(this.ground, this.player.shadow)
        this.game.physics.arcade.collide(this.player, this.car, this.carOverlap, null, this)
        this.game.physics.arcade.overlap(this.player, this.lootSprite, this.lootOverlap, null, this)
        this.game.physics.arcade.overlap(
            this.player, this.bigObstacle,
            this.obstacleOverlap, null, this,
        )
        this.game.physics.arcade.overlap(
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
        if (this.isObstaclesSpawned) {
            this.player.crush()
            this.player.carfallAnimation.onComplete.add(this.game.gameOver, this)
        }
    }

    lootOverlap() {
        if (!this.isLooted) {
            this.lootSprite.renderable = false
            this.createScoreAnimation(this.lootSprite.x, this.lootSprite.y, 2000)
            this.isLooted = true
            this.coinSound.play()
        }
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
                        const y = Math.random() < 0.5 ? 0.73 * this.game.world.height :
                            0.64 * this.game.world.height
                        this.lootSprite.x = this.game.world.width - 50
                        this.lootSprite.y = y
                        this.lootSprite.body.velocity.x = -this.waveSpeed
                        this.lootSprite.renderable = true
                        this.lootCounter -= 1
                        this.isLooted = false
                    }
                    return
                }

                if (this.bigObstacleCounter > 0) {
                    this.isObstaclesSpawned = true
                    if (this.bigObstacle.x <= 0) {
                        const y = Math.random() < 0.5 ? 0.67 * this.game.world.height :
                            0.56 * this.game.world.height
                        this.bigObstacle.x = this.game.world.width - 50
                        this.bigObstacle.y = y
                        this.bigObstacle.body.velocity.x = -this.waveSpeed
                        this.bigObstacle.renderable = true
                        this.bigObstacleCounter -= 1
                    }
                    return
                }

                if (this.smallObstacleCounter > 0) {
                    this.isObstaclesSpawned = true
                    if (this.lastSmallObstacle.x <= 0) {
                        let offset = 0
                        this.smallObstacles.forEach(function (item) {
                            item.x = this.game.world.width - 50 + offset
                            item.body.velocity.x = -this.waveSpeed
                            offset += 5
                        }, this)
                        this.smallObstacles.visible = true
                        this.smallObstacleCounter -= 1
                    }
                } else {
                    this.waveCount -= 1
                    this.waveSpeed += 500

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
            } else if (!this.player.isPlayerFinished) {
                this.player.finish()
                this.player.omgAnimation.onComplete.add(this.game.playerWon, this)
            }
        } else {
            this.skipIterations -= 1
        }
    }

    render() {
        if (__DEV__) {
            /* this.game.debug.spriteInfo(this.lootSprite, 32, 32)
            this.game.debug.body(this.player)
            this.game.debug.body(this.lootSprite)
            this.game.debug.body(this.bigObstacle)
            this.game.debug.body(this.player.shadow)
            this.game.debug.body(this.ground)

            this.smallObstacles.forEach(function (item) {
                this.game.debug.body(item)
            }, this) */
        }
    }

    createScoreLabel() {
        const scoreFont = '28px NintendoNES'
        this.scoreLabel = this.game.add.text(10, 10, '0', { font: scoreFont, fill: '#ffffff', stroke: '#000000', strokeThickness: 6 })
        this.scoreLabel.align = 'center'
    }

    createScoreAnimation(x, y, score) {
        const scoreFont = '18px NintendoNES'
        const scoreAnimation = this.game.add.text(x + 10, y - 10, score.toString(), { font: scoreFont, fill: '#ffffff' })
        scoreAnimation.align = 'center'

        this.game.time.events.add(Phaser.Timer.SECOND * 1, function() {
            scoreAnimation.destroy()
            this.player.score += score
            this.scoreLabel.text = this.player.score.toString()
        }, this)
    }
}
