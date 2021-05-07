console.log("entered starter");
class Starter extends Phaser.Scene {
    constructor() {
        super('startScene');
    }

    preload() {
        this.load.path = './assets/';
        this.load.image('bunny', 'Bunny.png');
        this.load.image('floors', 'block.png');
        this.load.image('room', 'EndlessRunnerBGFinal.png');
        this.load.image('groundScroll', 'floor.png');
        this.load.image('blockB', 'BoxB.png');
        this.load.image('blockA', 'BoxA.png');
        this.load.audio('bunny_jump', 'BunnyJumpSoundFinal.wav');
        this.load.audio('bunny_hit', 'BunnyHitSound.wav');
        this.load.audio('vacuum_collision', 'VacuumCollision.wav');
    }

    create() {
        cursors = this.input.keyboard.createCursorKeys();
        speedInc = 30;

        // variables and settings
        this.ACCELERATION = 200;
        this.MAX_X_VEL = 5;   // pixels/second
        this.MAX_Y_VEL = 5;
        this.DRAG = 2500;    // DRAG < ACCELERATION = icy slide
        this.JUMP_VELOCITY = -300;
        this.physics.world.gravity.y = 400;

        this.background = this.add.tileSprite(
            0, 0, 960, 640, 'room'
            ).setOrigin(0,0);

        // make ground tiles group
        this.ground = this.add.group();
        for(let i = -10; i < game.config.width; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height / 1.5 - tileSize, 'floors').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }

        // put another tile sprite above the ground tiles
        this.groundScroll = this.add.tileSprite(0, game.config.height/1.5-tileSize, game.config.width, 100, 'groundScroll').setOrigin(0);

        //OBSTACLE GROUP
        this.obstacleGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });

        this.bunny = this.physics.add.sprite(game.config.width/2, game.config.height/1.5-tileSize -40, 'bunny').setScale(SCALE+.1);
        this.bunny.body.setBounce(0.1);
        this.bunny.bumped = false;      // if bunny has hit obstacle, slow down
        this.bunny.destroyed = false;   // if vacuum caught up
        this.physics.add.collider(this.bunny, this.ground);

        this.time.delayedCall(2500, () => { 
            this.addBarrier(); 
        });

        // this.physics.add.collider(this.obstacleGroup, this.ground); //problems whateverr
        
        //TIMER
        // Phaser.Time.TimerEvent({
        //     delay: 3000,                // ms
        //     callback: this.levelBump(),
        //     loop: true
        // })

        //sounds?
        this.jump = this.sound.add('bunny_jump', {volume: 0.35});
    }

    addBarrier() {
        // CREATION OF OBSTACLE INSTANCE!!
        let obsSprite = (Math.random() > 0.5) ? 'blockA': 'blockB';
        let speedVariance  = -200 - speedInc;
        console.log(speedVariance);
        let obstacle = new Obstacle(this, Phaser.Math.Between(speedVariance, -200-(speedInc/2)), obsSprite);
        this.obstacleGroup.add(obstacle);
    }

    update() {
        this.background.tilePositionX += 5;
        if(this.bunny.destroyed == false & (this.bunny.x < 120 && this.bunny.y < game.config.height + 30)) {
            this.bunny.destroyed = true;
            this.bunny.destroy();   // game over
        }
        if(!this.bunny.destroyed) {
            // bunny controls
            if(this.bunny.body.touching.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
                
                this.jump.play();
                this.bunny.body.setVelocityY(this.JUMP_VELOCITY);
            } else if(cursors.right.isDown && this.bunny.x < game.config.width-5) {
                this.bunny.body.setAccelerationX(this.ACCELERATION);
            } else if (cursors.left.isDown && this.bunny.x > 5) {
                this.bunny.body.setAccelerationX(-this.ACCELERATION);
            } else {
                // set acceleration to 0 so DRAG will take over
                this.bunny.body.setAccelerationX(0);
                this.bunny.body.setDragX(this.DRAG);
            }
            this.physics.world.collide(this.bunny, this.obstacleGroup, this.obsCollision, null, this);
            
            this.bunny.x = Phaser.Math.Clamp(this.bunny.x, 10, game.config.width); // needs to stop acceleration.
        }
    }

    obsCollision() {
        //allows resetting jumps, tho not necessary
        //check simply needs to be before button presses are checked
        //this.bunny.body.touching.down == true;
    }

    levelBump() {
        console.log("bump called");
        if(speedInc < -400) speedInc += 40;
    }

}
