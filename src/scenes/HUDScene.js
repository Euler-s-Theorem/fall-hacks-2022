import { SCENE_KEYS } from '../constants/scenes.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super(SCENE_KEYS.hud);
    }

    init(data) {
        this.gameScene = data.GameScene;

    }

    create() {
        this.text = this.add.text(800, 20, "Time left: ", { fontSize: '40px', fill: 'white', fontWeight: 'bold' });
        // this.text.setShadow(10, 0, 'rgba(255, 2, 100, 1)', 0);
    }

    update() {

        let remainingSeconds = this.gameScene.timer.getRemainingSeconds();
        this.text.text = 'Time Left: ' + remainingSeconds.toFixed(2);
    }

    resize() {
    }
}
