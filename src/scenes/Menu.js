class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }
    preload() {
        this.load.spritesheet('menubg', 'assets/MenuScreenSpriteSheet.png', {frameWidth: 1080, frameHeight: 620, startFrame: 0, endFrame: 28});
        this.load.audio('sfx_select', './assets/MenuButtonSound.wav');
        this.load.audio('music', './assets/MusicTrack.wav');
    }

    create() {
        this.anims.create({
            key: 'background',
            frames: this.anims.generateFrameNumbers('menubg', { start: 0, end: 28, first: 0}),
            frameRate: 12,
            repeat: -1
        });

        let background = this.add.sprite(-55, 0, 'background').setOrigin(0, 0);
        this.add.rectangle(0,620,960,20,0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(240,400,160,50,0x226622).setOrigin(0,0);
        
        background.anims.play('background');

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#FFFFFF',
            color: '#111111',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }

        this.pointer = this.input.activePointer;

        // playButton.width = 100;
        // playButton.length = 45;
        this.add.text(game.config.width/3, 2*game.config.height/3, 
            'Play Game', menuConfig).setOrigin(0.5);
        this.add.text(2*game.config.width/3+27, 2*game.config.height/3, 
            'Tap to Play Game', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/3.5, 2*game.config.height/2.6, 
            'Instructions:', menuConfig).setOrigin(0.5);
        this.add.text(2*game.config.width/3.2, 2*game.config.height/2.6, 
            'Press ^ arrow key to Jump', menuConfig).setOrigin(0.5);
        this.add.text(2*game.config.width/3, 2*game.config.height/2.4, 
            'Press <- arrow key to move Left', menuConfig).setOrigin(0.5);
        this.add.text(2*game.config.width/3, 2*game.config.height/2.2, 
            'Press -> arrow key to move Right', menuConfig).setOrigin(0.5);


        // keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        
        this.music = this.sound.add('music');

            let musicConfig = {
              mute: false,
              volume:0.4,
              rate:1,
              detune:0,
              seek:0,
              loop: true,
              delay:0,

            }
          this.music.play(musicConfig);

    }

    startScene() {
        this.scene.start("startScene");
    }

    update() {
        if(this.pointer.isDown && this.pointer.x > 240
            && this.pointer.x < 400
            && this.pointer.y > 420
            && this.pointer.y < 440) {
                this.sound.play("sfx_select");
                this.startScene();
        }
    }
    
}
