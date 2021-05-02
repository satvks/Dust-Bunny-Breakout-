class Bunny extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 20, game.config.height/1.5-tileSize -10, 'bunny').setScale(SCALE+.1);
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add to physics system
        console.log("bunny constructor called");
    }

    create() {
        console.log("cursor keys made");  // not being called right now
        cursors = this.input.keyboard.createCursorKeys();
        // // variables and settings
        // this.ACCELERATION = 500;
        // this.MAX_X_VEL = 500;   // pixels/second
        // this.MAX_Y_VEL = 500;
        // this.DRAG = 700;    // DRAG < ACCELERATION = icy slide
        // this.JUMP_VELOCITY = -500;
        // this.physics.world.gravity.y = 500;
    }

    update() {
        console.log("update called");
        // bunny controls
        if(this.bunny.body.touching.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.bunny.body.setVelocityY(this.JUMP_VELOCITY);
        } else if((cursors.right.isDown)) {
            this.bunny.body.setAccelerationX(this.ACCELERATION);
        } else if (cursors.left.isDown) {
            this.bunny.body.setAccelerationX(-this.ACCELERATION);
        } else {
            // set acceleration to 0 so DRAG will take over
            this.bunny.body.setAccelerationX(0);
            this.bunny.body.setDragX(this.DRAG);
        }
        this.bunny.x = Phaser.Math.Clamp(this.bunny.x, 10, game.config.width); // needs to stop acceleration.
    }
}