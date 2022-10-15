import { SCENE_KEYS } from '../constants/scenes.js';

export default class TitleScene extends Phaser.Scene {
    constructor() {
        super(SCENE_KEYS.title);
    }

    create() {
        // Reposition objects when the screen is resized.
        this.scale.on('resize', this.resize, this);

        // Remove the resize event for this scene when the scene stops.
        this.events.on('shutdown', () => {
            this.scale.off('resize', this.resize);
        });

        this.scene.start(SCENE_KEYS.game);
    }

    resize() {
        // Get the screen size of the game.
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
    }
};
