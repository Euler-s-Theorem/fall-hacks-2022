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
        this.pauseText = this.add.text(20, 20, "Press 'p' to pause", { fontSize: '40px', fill: 'white', fontWeight: 'bold' });
    }

    update() {
        if(!this.gameScene.paused) {
            let remainingSeconds = this.gameScene.timer.getRemainingSeconds();
            this.text.text = 'Time Left: ' + remainingSeconds.toFixed(2);
        }
        
    }
}
