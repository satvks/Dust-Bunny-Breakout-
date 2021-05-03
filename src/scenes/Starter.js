console.log("entered starter");
class Starter extends Phaser.Scene {
    constructor() {
        super('startScene');
    }

    preload() {
        this.load.path = './assets/';
        this.load.image('bunny', 'Bunny.png');
        this.load.image('floors', 'block.png');
        this.load.image('room', 'bunnybg.png');
        this.load.image('groundScroll', 'floor.png');
        this.load.image('blockB', 'BoxB.png');
        this.load.image('blockA', 'BoxA.png');
    }

    create() {
        cursors = this.input.keyboard.createCursorKeys();

        // variables and settings
        this.ACCELERATION = 500;
        this.MAX_X_VEL = 100;   // pixels/second
        this.MAX_Y_VEL = 200;
        this.DRAG = 300;    // DRAG < ACCELERATION = icy slide
        this.JUMP_VELOCITY = -300;
        this.physics.world.gravity.y = 400;

        this.background = this.add.tileSprite(
            0, 0, 960, 640, 'room'
            ).setOrigin(0,0);

        // make ground tiles group
        this.ground = this.add.group();
        for(let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height / 1.5 - tileSize, 'floors').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }

        // put another tile sprite above the ground tiles
        this.groundScroll = this.add.tileSprite(0, game.config.height/1.5-tileSize, game.config.width, 100, 'groundScroll').setOrigin(0);

        this.obstacleGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });

        this.bunny = this.physics.add.sprite(20, game.config.height/1.5-tileSize -40, 'bunny').setScale(SCALE+.1);
        this.bunny.body.setBounce(0.1);
        this.physics.add.collider(this.bunny, this.ground);

        this.addBarrier();
        // this.physics.add.collider(this.obstacleGroup, this.ground); //problems whateverr

    }

    addBarrier() {
        let obstacle = new Obstacle(this);
        this.obstacleGroup.add(obstacle);
    }

    update() {
        this.background.tilePositionX += 2;

         // bunny controls
         if(this.bunny.body.touching.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.bunny.body.setVelocityY(this.JUMP_VELOCITY);
        } else if(cursors.right.isDown) {
            this.bunny.body.setAccelerationX(this.ACCELERATION);
        } else if (cursors.left.isDown) {
            this.bunny.body.setAccelerationX(-this.ACCELERATION);
        } else {
            // set acceleration to 0 so DRAG will take over
            this.bunny.body.setAccelerationX(0);
            this.bunny.body.setDragX(this.DRAG);
        }
        if (this.bunny.x < 10 || this.bunny.x >= game.config.width-5) {
            
            //this.bunny.body.setVelocityX(0);
        }
        this.bunny.x = Phaser.Math.Clamp(this.bunny.x, 10, game.config.width); // needs to stop acceleration.
    }
}