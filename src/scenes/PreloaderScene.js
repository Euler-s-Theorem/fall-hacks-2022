import { SCENE_KEYS } from '../constants/scenes.js';

export default class PreloaderScene extends Phaser.Scene {
    constructor() {
        super(SCENE_KEYS.preloader);
    }

    preload() {
        // Reposition objects when the screen is resized.
        this.scale.on('resize', this.resize, this);

        // Remove the resize event for this scene when the scene stops.
        this.events.on('shutdown', () => {
            this.scale.off('resize', this.resize);
        });
    }

    create() {
        this.scene.start(SCENE_KEYS.title);
    }

    resize() {
        // The current size of the screen.
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
    }
};
