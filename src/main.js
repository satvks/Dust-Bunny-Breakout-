// Group Members: Satvik Srinivasan, Shaurya Bansal, Tate Pieper
// Game Name: Dust Bunny Breakout
// Date Completetd: 05/03/2021
//Creative Tilt: Adding idle/running animations for the bunny. Combining animations with the gameplay was a new and interesting ascpect of our game which we were proud of.
//In terms of code we implemented physics on objects in unique ways which had an effect on player difficulty. Messing around with the random generation of objects proved to 
//be a challenge but allowed us to create a fun mechanic for our game.
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
    scene: [ Starter ]
}

let game = new Phaser.Game(config);

//globals
let cursors;
let bunny = null;
const SCALE = 0.5;
const tileSize = 26;
