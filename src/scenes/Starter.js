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

        this.bunny = this.physics.add.sprite(20, game.config.height/1.5-tileSize, 'bunny').setScale(SCALE+.1);

        this.barrierGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });

    }

    addBarrier() {
        let barrier = new Obstacle(this);
        this.barrierGroup.add(barrier);
    }

    update() {
        this.background.tilePositionX += 2;
    }

}