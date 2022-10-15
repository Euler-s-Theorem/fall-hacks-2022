import { FILESIZE } from "./constants/fileSize"

export default {
    type: Phaser.AUTO,
    width: FILESIZE.x,
    height: FILESIZE.y,
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
