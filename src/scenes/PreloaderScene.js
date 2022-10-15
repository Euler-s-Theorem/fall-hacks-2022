import { SCENE_KEYS } from '../constants/scenes.js';

export default class PreloaderScene extends Phaser.Scene {
    constructor() {
        super(SCENE_KEYS.preloader);
    }

    preload() {
        // this.load.spritesheet('playerBlue', 'assets/playerBlue.png', {frameWidth: 24, frameHeight: 24});
        this.load.spritesheet('playerGreen', 'assets/playerGreen.png', {frameWidth: 24, frameHeight: 24});
        // this.load.spritesheet('playerGreen', 'assets/playerGreen.png', 24, 24, 24);
        // this.load.spritesheet('playerRed', 'assets/playerRed.png', {frameWidth: 24, frameHeight: 24});
        // this.load.spritesheet('playerYellow', 'assets/playerYellow.png', {frameWidth: 24, frameHeight: 24});
    }

    create() {
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('playerGreen', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('playerGreen', {start: 4, end: 9}),
            frameRate: 10,
            repeat: -1
        });

        this.scene.start(SCENE_KEYS.title);
    }
};
