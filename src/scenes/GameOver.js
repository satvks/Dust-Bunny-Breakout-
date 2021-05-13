class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene');
    }

    create() {
        this.anims.create({
            key: 'background',
            frames: this.anims.generateFrameNumbers('menubg', { start: 0, end: 28, first: 0}),
            frameRate: 12,
            repeat: -1
        });

        let background = this.add.sprite(-55, 0, 'background').setOrigin(0, 0);
        // this.add.rectangle(0,620,960,20,0xFFFFFF).setOrigin(0,0);
        // this.add.rectangle(240,400,160,50,0x226622).setOrigin(0,0);
        
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

        //this.pointer = this.input.activePointer;

        // playButton.width = 100;
        // playButton.length = 45;
        this.add.text(game.config.width/2, game.config.height/2+20, 
            'Oof, You got Dusted!' +
            'Tap \'R\' key to try again!', menuConfig).setOrigin(0.5);
        //this.add.text(2*game.config.width/3+27, 4*game.config.height/9, 
          //  '', menuConfig).setOrigin(0.5);


        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

    }

    startScene() {
        this.scene.start("startScene");
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyR)) {
                this.sound.play("sfx_select");
                this.startScene();
        }
    }
    
}
