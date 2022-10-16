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

        this.button = this.physics.add.staticSprite(400,450, 'button', 0);
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

        
        // If paused or not.
        this.paused = false;
        this.doorOpen = false;

        this.scene.launch(SCENE_KEYS.hud, { GameScene: this });
    }

    pressButton() {
        if (!this.doorOpen) {
            this.doorOpen = true;
            this.button.anims.play('buttonDown', true);
            console.log("PRESSED BUTTON");
        }
    }

    createPlatforms() {
        this.platforms.create(400, 568, 'platform').setScale(2).refreshBody();
    }

    pauseGame() {
    }

    unpauseGame() {
    }

    gameOver() {
        console.log("game over");
    }

    update() {
        // Get which keys are pressed and just pressed.
        this.currentInput = this.getActiveKeys();
        this.door.anims.play('closing', true);
        this.player.update(this.currentInput);
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
