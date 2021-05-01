//console.log("obstacle constructor not called");
class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        // calls Phaser Physics Sprite constructor
        // Physics.Sprite(game/scene,x,y,texture,frame (if part of spritesheet));
        super(scene, game.config.width, game.config.height / 1.5 - tileSize, 'blockA');
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add to physics system
        this.setVelocityX(240);                   // make it go!
        this.setImmovable();    
        this.newObstacle = true;                 // custom property to control obstacle spawning
        this.setDepth(0);
    }
    
    update() {
        // add new barrier when existing barrier hits center X
        if(this.newObstacle && this.x < centerX) {
            this.newObstacle = false;
            // (recursively) call parent scene method from this context
            this.scene.addBarrier(this.parent);
        }

        if(this.x < -this.width) {
            this.destroy();
        }
    }

}