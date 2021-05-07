class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, speed, sprite) {
        // calls Phaser Physics Sprite constructor
        // Physics.Sprite(game/scene,x,y,texture,frame (if part of spritesheet));
        super(scene, game.config.width, game.config.height / 1.5 - tileSize -30, sprite).setScale(SCALE+2);
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add to physics system
        this.setVelocityX(speed);                   // make it go!
        //console.log(speed);
        this.body.allowGravity = false;
        this.setImmovable();
        this.newObstacle = true;                 // custom property to control obstacle spawning
    }
    
    update() {
        //update should randomize frequency of block placement
        // not implemented yet. google dino run might help?
        // add new barrier when existing barrier hits center X
        if(this.newObstacle && this.x < game.config.width/2) {
            this.newObstacle = false;
            // (recursively) call parent scene method from this context
            this.scene.addBarrier(this.parent);
        }

        if(this.x < -this.width) {
            //console.log("deleted");
             this.destroy();
        }
    }

}