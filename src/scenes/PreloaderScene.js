import { SCENE_KEYS } from '../constants/scenes.js';

export default class PreloaderScene extends Phaser.Scene {
    constructor() {
        super(SCENE_KEYS.preloader);
    }

    preload() {
        // Reposition objects when the screen is resized.
        this.scale.on('resize', this.resize, this);
        this.load.spritesheet('door', 
        'bamboo-doorv3.png',
        { frameWidth: 68, frameHeight: 100 });
        // Remove the resize event for this scene when the scene stops.
        this.events.on('shutdown', () => {
            this.scale.off('resize', this.resize);
        });
    }

    create() {
        this.scene.start(SCENE_KEYS.title);
        this.anims.create({
            key: 'closed',
            frames: [ { key: 'door', frame: 0 } ],
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
            frames: [ { key: 'door', frame: 6 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'closing',
            frames: this.anims.generateFrameNumbers('door', { start: 6, end: 0 }),
            frameRate: 10,
            repeat: -1
        });
    }

    resize() {
        // The current size of the screen.
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
    }
};
