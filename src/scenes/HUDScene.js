import { SCENE_KEYS } from '../constants/scenes.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super(SCENE_KEYS.hud);
    }

    create() {
        // Reposition objects when the screen is resized.
        this.scale.on('resize', this.resize, this);

        // Remove the resize event for this scene when the scene stops.
        this.events.on('shutdown', () => {
            this.scale.off('resize', this.resize);
        });
    }

    update() {
    }

    resize() {
    }
}
