export default {
    type: Phaser.AUTO,
    width: 1200,
    height: 700,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 1000
            },
            debug: false,
        }
    },
    antialias: false,
    scale: {
        parent: 'game',
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
}
