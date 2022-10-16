import { FILESIZE } from '../constants/fileSize.js';
import { SCENE_KEYS } from '../constants/scenes.js';
import Player from '../sprites/Player.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super(SCENE_KEYS.game);
    }

    create() {
        this.keys = {
            p: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P),  // Pause the game.
            e: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),  // Pause the game.
            one: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE),  // For switching player colour.
            two: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO),  // For switching player colour.
            three: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE),  // For switching player colour.
            four: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR),  // For switching player colour.
        }
        // Create the keys for player movement.
        this.keys.cursors = this.input.keyboard.createCursorKeys();
        this.keys.wasd = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        });

        // Place keys for the same purpose in a list together.
        this.keyGroups = {
            up: [this.keys.cursors.up, this.keys.wasd.up, this.keys.cursors.space],
            left: [this.keys.cursors.left, this.keys.wasd.left],
            down: [this.keys.cursors.down, this.keys.wasd.down],
            right: [this.keys.cursors.right, this.keys.wasd.right],
            pause: [this.keys.p, this.keys.e],
            one: [this.keys.one],
            two: [this.keys.two],
            three: [this.keys.three],
            four: [this.keys.four],
        }

        // The types of key input the game needs.
        this.keyInputTypes = ['isDown', 'justDown'];

        this.add.image(0, 0, 'sky').setOrigin(0, 0).setScale(2);




        this.button = this.physics.add.staticSprite(FILESIZE.x / 2, 3 / 5 * FILESIZE.y + 64, 'button', 0);

        this.button.setScale(4);
        this.door = this.physics.add.staticSprite(100, 450, 'door');

        //player = this.physics.add.sprite(100, 450, 'dude');

        this.player = new Player({
            scene: this,
            position: {
                x: 200,
                y: 200
            },
            texture: 'playerGreen',
            frame: 0
        });

        //timer
        this.timer = this.time.addEvent({
            delay: 1000 * 60,
            callback: this.gameOver,
            args: [],
            callbackScope: this,
        });

        // Platforms
        this.platforms = this.physics.add.staticGroup();
        this.physics.add.collider(this.player, this.platforms);
        this.createPlatforms();

        this.dynamicWorldOjects = this.physics.add.group();

        this.physics.add.overlap(this.player, this.button, this.pressButton, null, this);

        //make a ball group and then a ball 
        this.ball = this.dynamicWorldOjects.create(800, 16, 'ball');
        //made ball bounce against platforms and other surfaces
        this.physics.add.collider(this.ball, this.platforms);
        this.ball.setBounce(1).setScale(2);
        this.ball.setCollideWorldBounds(true);
        this.ball.setVelocity(Phaser.Math.Between(150, 200), Phaser.Math.Between(-200, 200));

        //collider for ball and player
        this.physics.add.collider(this.player, this.ball, this.playerHitsBall, null, this);

        // If paused or not.
        this.paused = false;
        this.doorOpen = false;

        this.scene.launch(SCENE_KEYS.hud, { GameScene: this });

       
    }

    checkOverlap(spriteA, spriteB) {
        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();
        return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
    }

    playerHitsBall() {
        this.physics.pause();

        this.player.setTint(0xff0000);

        //this.player.anims.play('turn');
        this.gameOver();
    }

    pressButton() {
        if (!this.doorOpen) {
            this.doorOpen = true;
            this.button.anims.play('buttonDown', true);
            console.log("PRESSED BUTTON");
        }
    }


    createPlatforms() {
        for (let i = 0; i < 20; i++) {
            this.platforms.create(64 * i + 32, FILESIZE.y - 32, 'tiles', 0);
        }
        this.createNPlatforms(3, FILESIZE.x / 2, 3 / 4 * FILESIZE.y);

        this.createNPlatforms(2, FILESIZE.x * 3 / 4, 3 / 5 * FILESIZE.y);  // Button platform
        this.createNPlatforms(2, FILESIZE.x * 1 / 4, 3 / 5 * FILESIZE.y);
    }

    createNPlatforms(n, centerX, centerY) {
        for (let i = -1 * (n / 2); i < n / 2; i++) {
            this.platforms.create(centerX + i * 64 + 32, centerY, 'tiles', 0);
        }
    }

    pauseGame() {
        this.paused = true;
        // Overlay
    }

    unpauseGame() {
        this.paused = false;
        // Remove overlay
    }

    gameOver() {
        console.log("game over");
    }

    update() {
        // Get which keys are pressed and just pressed.
        if (!this.paused) {
            if (!this.checkOverlap(this.player, this.button)) {
                this.doorOpen = false;
                this.door.anims.play('closing', true);
                this.button.anims.play('buttonUp', true);
            }
        } else {
            
        }
        this.currentInput = this.getActiveKeys();
        this.player.update(this.currentInput);
        this.playDoor();
    }

    playDoor(){
        if(this.doorOpen)
        {
            this.door.anims.play('open', true);
        }
        else
        {
            this.door.anims.play('closed', true);
        }
    }

    isActive(keys, inputType) {
        let activeKeys;

        // Get a list of all keys that pass the filter (if the key is
        // down or just got pressed).
        if (inputType === 'isDown') {
            activeKeys = keys.filter(key => key.isDown);
        } else if (inputType === 'justDown') {
            activeKeys = keys.filter(key => Phaser.Input.Keyboard.JustDown(key));
        }

        // If no keys are active, the length of the list will be 0,
        // which will return false.
        return Boolean(activeKeys.length);
    }

    getActiveKeys() {
        // Get current key inputs.
        let currentInput = {}
        // Get all input types (isDown, justDown).
        Object.keys(this.keyGroups).forEach(keyGroupType => {
            currentInput[keyGroupType] = {}
            this.keyInputTypes.forEach(keyInputType => {
                currentInput[keyGroupType][keyInputType] = this.isActive(this.keyGroups[keyGroupType], keyInputType);
            });
        });

        return currentInput;
    }


}
