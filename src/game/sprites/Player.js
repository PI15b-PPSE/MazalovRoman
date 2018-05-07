import Phaser from 'phaser'

export default class extends Phaser.Sprite {
    constructor({
        game, x, y, asset, scale, ground, shadow, character,
    }) {
        super(game, x, y, asset)
        this.frameName = `${character}/stand`
        // this.tint = 0xffff9f
        this.game.physics.enable(this)
        this.facing = 'right'
        this.dx = 250
        this.dj = -400
        this.dy = 3
        this.jumpTimer = 0
        this.body.collideWorldBounds = true
        this.body.gravity.y = 1000
        this.animations.add(
            'running',
            Phaser.Animation.generateFrameNames(`${character}/run/`, 0, 7),
            6,
            true,
        )
        this.animations.add(
            'carjump',
            Phaser.Animation.generateFrameNames(`${character}/car/`, 1, 2),
            1,
            true,
        )

        this.carfallAnimation = this.animations.add(
            'carfall',
            [`${character}/carfall/1`, `${character}/carfall/2`, 'flame/0',
                'flame/1', 'flame/2', 'flame/3', `${character}/carfall/4`],
            1,
            true,
        )

        this.omgAnimation = this.animations.add(
            'omg',
            [`${character}/carfall/1`, `${character}/carfall/2`, 'flame/0',
                'flame/1', 'flame/2', 'flame/3', `${character}/omg`],
            1,
            true,
        )

        this.isMoving = false
        this.isJumping = false
        this.scalingFactor = scale
        this.scale.setTo(scale, scale)
        this.ground = ground
        this.state = 'runner'
        this.carDy = 1
        this.magnitude = 0
        this.shadow = shadow
        this.shadow.body.gravity.y = 1000
        this.shadow.body.setSize(1, 1, 0, 0)
        this.shadow.renderable = false
        this.isPlayerCrushed = false
        this.isPlayerFinished = false
        this.score = 0
        this.character = character
    }

    moveLeft() {
        this.body.velocity.x = -this.dx
        this.shadow.body.velocity.x = -this.dx
        this.facing = 'left'

        if (this.state === 'runner') {
            if (this.isMoving && this.facing !== 'left') {
                this.animations.stop()
            }
            this.isMoving = true
            this.animations.play('running')
            this.scale.setTo(-this.scalingFactor, this.scalingFactor)
        } else if (this.body.touching.down) {
            this.animations.stop()
            this.frameName = `${this.character}/car/0`
        }
    }

    moveRight() {
        this.body.velocity.x = this.dx
        this.shadow.body.velocity.x = this.dx
        this.facing = 'right'

        if (this.state === 'runner') {
            if (this.isMoving && this.facing !== 'right') {
                this.animations.stop()
            }
            this.isMoving = true
            this.animations.play('running')
            this.scale.setTo(this.scalingFactor, this.scalingFactor)
        } else if (this.body.touching.down) {
            this.animations.stop()
            this.frameName = `${this.character}/car/0`
        }
    }

    moveUp() {
        const isRunner = this.state === 'runner'
        // this.game.physics.arcade.moveToXY(this, this.x, this.y - this.dy, this.dx)
        if (this.ground.y > (isRunner ? 0.69 : 0.73) * this.game.world.height) {
            this.ground.y -= this.dy
        }
        this.facing = 'up'

        if (isRunner) {
            if (this.isMoving && this.facing !== 'up') {
                this.animations.stop()
            }

            this.isMoving = true
            this.animations.play('running')
        } else if (this.body.touching.down) {
            this.animations.stop()
            this.frameName = `${this.character}/car/0`
        }
    }

    moveDown() {
        const isRunner = this.state === 'runner'
        // this.game.physics.arcade.moveToXY(this, this.x, this.y + this.dy, this.dx)
        if (this.ground.y < (isRunner ? 0.81 : 0.78) * this.game.world.height) {
            this.ground.y += this.dy
        }
        this.facing = 'down'

        if (isRunner) {
            if (this.isMoving && this.facing !== 'down') {
                this.animations.stop()
            }

            this.isMoving = true
            this.animations.play('running')
        } else if (this.body.touching.down) {
            this.animations.stop()
            this.frameName = `${this.character}/car/0`
        }
    }

    jump() {
        if (this.body.touching.down && this.game.time.now > this.jumpTimer) {
            this.body.velocity.y = this.dj
            this.jumpTimer = this.game.time.now + 650

            if (this.state === 'driver' && !this.isJumping) {
                this.animations.play('carjump', 3, false)
            }
            this.isJumping = true
        } else {
            this.isJumping = false
        }
    }

    isOnCar() {
        return this.state === 'driver'
    }

    onCar() {
        this.frameName = `${this.character}/car/0`
        this.state = 'driver'
        this.dj = -600
        this.shadow.renderable = true
        this.shadow.x = this.x
        this.shadow.y -= 20
    }

    walk() {
        this.frameName = `${this.character}/stand`
        this.state = 'runner'
        this.dj = -400
    }

    stop() {
        this.body.velocity.x = 0
        this.shadow.body.velocity.x = 0
        this.isMoving = false

        if (this.state === 'runner') {
            this.animations.stop()
        }

        if (this.state === 'runner') {
            this.frameName = `${this.character}/stand`
        } else if (this.body.touching.down) {
            this.frameName = `${this.character}/car/0`
        }
    }

    crush() {
        this.body.velocity.y = -100
        this.body.velocity.x = -50
        this.body.gravity.y = 50
        this.animations.play('carfall', 6, false)
        this.dx = 0
        this.dy = 0
        this.dj = 0
        this.isPlayerCrushed = true
    }

    finish() {
        this.body.velocity.y = -600
        this.animations.play('omg', 6, false)
        this.isPlayerFinished = true
    }

    update() {
        if (this.state === 'driver' && !this.isPlayerCrushed) {
            this.ground.y += this.carDy
            this.magnitude += this.carDy

            if (Math.abs(this.magnitude) > 10) {
                this.carDy = -this.carDy
            }
        }
    }
}
