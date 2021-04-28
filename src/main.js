
console.log("Printing canvas from main.js 1");
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
            //debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Starter ]
}

let game = new Phaser.Game(config);

console.log("Printing canvas from main.js");

//globals