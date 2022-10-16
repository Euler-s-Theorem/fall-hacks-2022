import { SCENE_KEYS } from '../constants/scenes.js';

export default class PreloaderScene extends Phaser.Scene {
    constructor() {
        super(SCENE_KEYS.preloader);
    }

    preload() {
        // Players
        this.load.spritesheet('playerBlue', 'assets/playerBlue.png', {frameWidth: 24, frameHeight: 24});
        this.load.spritesheet('playerGreen', 'assets/playerGreen.png', {frameWidth: 24, frameHeight: 24});
        this.load.spritesheet('playerRed', 'assets/playerRed.png', {frameWidth: 24, frameHeight: 24});
        this.load.spritesheet('playerYellow', 'assets/playerYellow.png', {frameWidth: 24, frameHeight: 24});

        this.load.spritesheet('door', 'assets/bamboo-doorv3.png', { frameWidth: 68, frameHeight: 100 });
        this.load.image('sky', 'assets/sky.png');
        this.load.image('platform', 'assets/platform.png');
        this.load.spritesheet('tiles', 'assets/tiles.png', { frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('button', 'assets/Button.png', {frameWidth: 16, frameHeight:6});
        this.load.image('ball', 'assets/Ball.png');

        this.load.image('doorOpen', 'assets/door/doorOpen.png');
        this.load.image('doorClosed', 'assets/door/doorClosed.png');
    }

    create() {
        this.anims.create({
            key: 'idleGreen',
            frames: this.anims.generateFrameNumbers('playerGreen', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'walkGreen',
            frames: this.anims.generateFrameNumbers('playerGreen', {start: 4, end: 9}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'idleBlue',
            frames: this.anims.generateFrameNumbers('playerBlue', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'walkBlue',
            frames: this.anims.generateFrameNumbers('playerBlue', {start: 4, end: 9}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'idleRed',
            frames: this.anims.generateFrameNumbers('playerRed', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'walkRed',
            frames: this.anims.generateFrameNumbers('playerRed', {start: 4, end: 9}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'idleYellow',
            frames: this.anims.generateFrameNumbers('playerYellow', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'walkYellow',
            frames: this.anims.generateFrameNumbers('playerYellow', {start: 4, end: 9}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'closed',
            frames: [{ key: 'door', frame: 0 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'opening',
            frames: this.anims.generateFrameNumbers('door', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'open',
            frames: [{ key: 'door', frame: 6 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'closing',
            frames: this.anims.generateFrameNumbers('door', { start: 6, end: 0 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'buttonDown',
            frames: [ { key: 'button', frame: 1 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'buttonUp',
            frames: [ { key: 'button', frame: 0 } ],
            frameRate: 20
        });

        this.scene.start(SCENE_KEYS.title);
    }
};
