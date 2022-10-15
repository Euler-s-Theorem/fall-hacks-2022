import { SCENE_KEYS } from '../constants/scenes.js';

export default class BootScene extends Phaser.Scene {
    constructor() {
        super(SCENE_KEYS.boot);
    }

    preload() {
        // Load assets used in the preloader scene.
    }

    create() {
        // Start the loading screen.
        this.scene.start(SCENE_KEYS.preloader);
    }
};
