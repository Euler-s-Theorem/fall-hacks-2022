import { SCENE_KEYS } from '../constants/scenes.js';

export default class TitleScene extends Phaser.Scene {
    constructor() {
        super(SCENE_KEYS.title);
    }

    create() {
        this.scene.start(SCENE_KEYS.game);
    }
};
