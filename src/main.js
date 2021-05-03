// define and configure main Phaser game object
let config = {
    type: Phaser.CANVAS,
    height: 640,
    width: 960,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Menu, Starter ]
}

let game = new Phaser.Game(config);

//globals
let cursors;
let bunny = null;
let keyS;
const SCALE = 0.5;
const tileSize = 26;