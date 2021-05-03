class Bunny extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 20, game.config.height/1.5-tileSize -40, 'bunny').setScale(SCALE+.1);
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add to physics system
        console.log("bunny constructor called");
        
        // // variables and settings
        // this.ACCELERATION = 500;
        // this.MAX_X_VEL = 500;   // pixels/second
        // this.MAX_Y_VEL = 500;
        // this.DRAG = 700;    // DRAG < ACCELERATION = icy slide
        // this.JUMP_VELOCITY = -500;
        // this.physics.world.gravity.y = 500;
    }

    create() {}

    update() {
        //console.log("update called");
        // bunny controls
        if(this.body.touching.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.body.setVelocityY(this.JUMP_VELOCITY);
        } else if(cursors.right.isDown) {
            this.body.setAccelerationX(this.ACCELERATION);
        } else if (cursors.left.isDown) {
            this.body.setAccelerationX(-this.ACCELERATION);
        } else {
            // set acceleration to 0 so DRAG will take over
            this.body.setAccelerationX(0);
            this.body.setDragX(this.DRAG);
        }
        this.x = Phaser.Math.Clamp(this.x, 10, game.config.width); // needs to stop acceleration.
    }
}