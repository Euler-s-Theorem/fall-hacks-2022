import { PLAYER_PHYSICS } from '../constants/player.js' 

export default class Player extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.position.x, config.position.y, 
            config.texture, config.frame);
        
        // Save the scene the player is in.
        this.scene = config.scene;
        
        // Add the player to the scene.
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.acceleration = PLAYER_PHYSICS.acceleration;
        this.jumpVelocity = PLAYER_PHYSICS.jumpVelocity;
        this.maxVelocity = PLAYER_PHYSICS.maxVelocity;
        this.drag = PLAYER_PHYSICS.drag;
        
        this.body.setMaxVelocity(this.maxVelocity.x, this.maxVelocity.y);
        this.body.setDrag(this.drag.x, this.drag.y);

        this.body.setCollideWorldBounds(true);

        this.body.setOffset(4, 4);
        this.body.setSize(15, 17);

        this.setScale(4);
    }

    update(input) {
        if (input.left.isDown) {
            // Move left.
            this.body.setAccelerationX(-this.acceleration);
            this.flipX = true;
            this.anims.play('walk', true);
        } else if (input.right.isDown) {
            // Move right.
            this.body.setAccelerationX(this.acceleration);
            this.flipX = false;
            this.anims.play('walk', true);
        } else {
            // Stop accelerating if no left or right key is being held
            // down.
            this.body.setAcceleration(0);

            this.anims.play('idle', true);
        }

        if (input.up.isDown && this.body.onFloor()) {
            // Jump off the ground.
            this.body.setVelocityY(-this.jumpVelocity);
        }

        if (input.pause.justDown) {
            this.scene.paused = !this.scene.paused;
        }
    }
}
