var menu_music;
var menusfx;

class EscenaMenu extends Phaser.Scene {
	
    constructor() {
        super('MenuScene');

        this.fondo;
        this.botonDetect;
        this.botonDetectChat;
        this.botonChat;
        this.startGame;
    }

    initialize() {
        Phaser.Scene.call(this, { key: 'MenuScene' });
    }

    preload() {
        this.load.image('fondoMenu', 'assets/chanderelle.png');
        this.load.image('boton', 'assets/jugar.png');
        this.load.image('chat', 'assets/chat.png');
        this.load.audio('Menu_music', ['music/JER.mp3','music/JER.ogg']);
        this.load.audio('menusfx', 'music/SFX/MenuSFX.mp3');


    }

    create() {

        this.fondo = this.add.image(400, 300, 'fondoMenu');
        this.fondo.setDepth(-1);
        this.fondo.setScale(0.5);



        var boton = this.add.image(0, 0, 'boton');
        boton.setScale(1);


        this.botonDetect = this.add.container(250, 500, [boton]);
        this.botonDetect.setSize(boton.height, boton.width);
        this.botonDetect.setInteractive();
        this.botonDetect.setScale(0.1);


        this.botonDetect.on('pointerdown', function () {
		  menusfx.play();
		  menu_music.stop();
		  				
          this.scene.scene.stop("MenuScene");
		  this.scene.scene.launch("GameScene");
          this.scene.scene.launch("PauseScene");
          this.scene.scene.sleep("PauseScene");
            
        })
	
		/*
        this.botonDetect.on('pointerover', function () {
            boton.setScale(1.1)
        })

        this.botonDetect.on('pointerout', function () {
            boton.setScale(1)
        })*/
        
        
        
        this.botonChat = this.physics.add.image(0, 0, 'chat');
        this.botonChat.body.setAllowGravity(false);
        this.botonChat.setScale(1.1);

        this.botonDetectChat = this.add.container(550, 500, [this.botonChat]);
        this.botonDetectChat.setSize(this.botonChat.height, this.botonChat.width);
        this.botonDetectChat.setInteractive();
        this.botonDetectChat.setScale(0.1);

        this.botonDetectChat.on('pointerdown', function () {
            menusfx.play();
            menu_music.stop();
            this.scene.scene.start('LobbyScene');
        });
        


        //Musica
        menu_music = this.sound.add('Menu_music');
        menusfx = this.sound.add('menusfx');
        menu_music.play();

        var menu_musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        };
        menu_music.play(menu_musicConfig);

    }

    update() {
			
    }

}


