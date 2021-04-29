class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        // calls Phaser Physics Sprite constructor
        // Physics.Sprite(game/scene,x,y,texture,frame (if part of spritesheet));
        super(scene, game.config.width, game.config.height / 1.5 - tileSize, 'floors');
        
    }
}