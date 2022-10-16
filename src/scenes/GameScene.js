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

        this.worldWidth = FILESIZE.x;
        this.worldHeight = FILESIZE.y;

        this.physics.world.bounds.x = 0;
        this.physics.world.bounds.y = 0;
        this.physics.world.bounds.width = this.worldWidth;
        this.physics.world.bounds.height = this.worldHeight;

        // The types of key input the game needs.
        this.keyInputTypes = ['isDown', 'justDown'];

        this.add.image(0, 0, 'sky').setOrigin(0, 0).setScale(2);
        this.add.image(FILESIZE.x, 0, 'sky').setOrigin(0, 0).setScale(2);
        this.sky=this.add.image(0, 0, 'sky').setOrigin(0, 0).setScale(2);

        this.doorLocation = {
            x: FILESIZE.x * 3 / 4,
            y: 3 / 5 * FILESIZE.y
        };
        this.doors = this.physics.add.staticGroup();
        this.realDoor = this.doors.create(this.doorLocation.x, this.doorLocation.y - 102, 'doorOpen');

        this.button = this.physics.add.staticSprite(FILESIZE.x / 2, 3 / 5 * FILESIZE.y + 64, 'button', 0);

        this.button.setScale(4);
        // this.door = this.physics.add.staticSprite(100, 450, 'door');

        //player = this.physics.add.sprite(100, 450, 'dude');

        this.player = new Player({
            scene: this,
            position: {
                x: 64 * 2,
                y: FILESIZE.y - 64 * 2
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
        this.ball.setVelocity(Phaser.Math.Between(300, 500), Phaser.Math.Between(300, 500));

        //collider for ball and player
        //this.physics.add.collider(this.player, this.ball, playerHitsBall, null, this);
        // this.physics.add.collider(this.player, this.ball, this.playerHitsBall, null, this);
        this.doorLocation = {
            x: FILESIZE.x * 3 / 4,
            y: 3 / 5 * FILESIZE.y
        };

        this.doors = this.physics.add.staticGroup();
        this.realDoor = this.doors.create(this.doorLocation.x, this.doorLocation.y - 102, 'doorOpen');
        this.physics.add.collider(this.player, this.ball, this.gameOver, null, this);

        //collision for player and door
        this.physics.add.overlap(this.player, this.realDoor, this.playerHitsDoor, null, this);


        // If paused or not.
        this.paused = false;
        this.doorOpen = false;

        // Set bounds so the camera won't go outside the game world.
        this.cameras.main.setBounds(0, 0, this.worldWidth, this.worldHeight);
        this.cameras.main.startFollow(this.player);

        this.scene.launch(SCENE_KEYS.hud, { GameScene: this });
    }

    checkOverlap(spriteA, spriteB) {
        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();
        return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
    }



    playerHitsDoor() {
        if (this.doorOpen) {
            //this.player.disableBody(true, true);
            this.gameWin();
        }
    }


    gameWin() {
        this.physics.pause();
        this.pauseGame();
        this.player.setTint('0x00ff00');

        this.gameWinText = this.add.text(300, 300, "GOOD GAME OVER!!!", { fontSize: '70px', fill: 'white', fontWeight: 'bold' });
        console.log("game over");
    }

    pressButton() {
        if (!this.doorOpen) {
            this.doorOpen = true;
            this.button.anims.play('buttonDown', true);
            console.log("PRESSED BUTTON");
        }
    }


    createPlatforms() {
        for (let i = 0; i < 40; i++) {
            this.platforms.create(64 * i + 32, FILESIZE.y - 32, 'tiles', 0);
        }
        this.createNPlatformsX(3, FILESIZE.x / 2, 3 / 4 * FILESIZE.y);

        this.createNPlatformsX(2, FILESIZE.x * 3 / 4, 3 / 5 * FILESIZE.y);  // Button platform
        this.createNPlatformsX(2, FILESIZE.x * 1 / 4, 3 / 5 * FILESIZE.y);  // Door platform?
        this.createNPlatformsX(4, FILESIZE.x, 2 / 5 * FILESIZE.y);

        this.createNPlatformsY(8, FILESIZE.x + 62 * 5, FILESIZE.y / 2 - 64);
    }

    createNPlatformsX(n, centerX, centerY) {
        for (let i = -1 * (n / 2); i < n / 2; i++) {
            this.platforms.create(centerX + i * 64 + 32, centerY, 'tiles', 0);
        }
    }

    createNPlatformsY(n, centerX, centerY) {
        for (let i = -1 * (n / 2); i < n / 2; i++) {
            this.platforms.create(centerX, centerY + i * 64 + 32, 'tiles', 0);
        }
    }

    pauseGame() {
        this.paused = true;
        // Stop Ball
        this.storeBallVelX = this.ball.body.velocity.x;
        this.storeBallVelY = this.ball.body.velocity.y;
        this.ball.body.allowGravity = false;
        this.ball.setVelocity(0, 0)

        // Overlay
        
    }

    unpauseGame() {
        this.paused = false;
        // Resume Ball
        this.ball.body.allowGravity = true;
        this.ball.setVelocity(this.storeBallVelX, this.storeBallVelY)

        // Remove overlay
    }

    gameOver() {
        this.text = this.add.text(400, 300, "Bad Game Over ", { fontSize: '70px', fill: 'white', fontWeight: 'bold' });
        this.physics.pause();
        this.pauseGame();
        this.player.setTint(0xff0000);

        // this.text = this.add.text(400, 300, "GAME OVER!!! ", { fontSize: '70px', fill: 'white', fontWeight: 'bold' });
        // console.log("game over");
    }

    update() {
        // Get which keys are pressed and just pressed.
        if(!this.paused) {
            this.untintEverything();
            if(!this.checkOverlap(this.player, this.button)) {
                this.doorOpen = false;
                // this.door.anims.play('closing', true);
                this.button.anims.play('buttonUp', true);
            }
        } else {
            this.tintEverything();
            this.text = this.add.text(FILESIZE.x / 2 - 130, 100, "Paused? ", { fontSize: '70px', fill: 'white', fontWeight: 'bold' });

        }
        this.currentInput = this.getActiveKeys();
        this.player.update(this.currentInput);
        this.playDoor();
    }

    tintEverything()
    {
        this.sky.setTint(0x808080);
        this.button.setTint(0x808080);
        this.ball.setTint(0x808080);
        this.realDoor.setTint(0x808080);
        this.platforms.setTint(0x808080);
    }

    untintEverything()
    {
        this.sky.setTint(0xffffff);
        this.button.setTint(0xffffff);
        this.ball.setTint(0xffffff);
        this.realDoor.setTint(0xffffff);
        this.platforms.setTint(0xffffff);
    }

    playDoor(){
        if(this.doorOpen)
        {
            // this.door.anims.play('open', true);
            this.realDoor.setTexture('doorOpen');
        }
        else {
            // this.door.anims.play('closed', true);
            this.realDoor.setTexture('doorClosed');
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
