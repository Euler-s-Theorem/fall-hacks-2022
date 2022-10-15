import { SCENE_KEYS } from '../constants/scenes.js';
var door;
export default class GameScene extends Phaser.Scene {
    constructor() {
        super(SCENE_KEYS.game);
    }

    

    create() {
        this.keys = {
            p: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P),  // Pause the game.
            e: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),  // Pause the game.
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
            pause: [this.keys.p, this.keys.e]
        }

        // The types of key input the game needs.
        this.keyInputTypes = ['isDown', 'justDown'];


        door = this.physics.add.staticSprite(100,450, 'door');
        //player = this.physics.add.sprite(100, 450, 'dude');


    }

    update() {
        // Get which keys are pressed and just pressed.
        this.currentInput = this.getActiveKeys();

        if (this.currentInput.up.justDown) {
            console.log("You pressed an up key!");
        }
        door.anims.play('closing', true);
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
