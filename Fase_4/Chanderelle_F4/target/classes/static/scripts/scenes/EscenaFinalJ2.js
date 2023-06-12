
var menu_musicj2;
var menusfx2;

class EscenaFinalJ2 extends Phaser.Scene {

    constructor() {
        super('FinalSceneJ2');

        this.background;
        this.botonDetectReiniciarJ2;
        this.victoriaJ2;
        this.brillo;
    }

    initialize() {
        Phaser.Scene.call(this, { key: 'FinalSceneJ2' });
    }

    preload() {
        this.load.image('imagenf', 'assets/game fondo.png');
        this.load.image('botonRestart', 'assets/restart.png');
        this.load.image('imagenVictoriaJ2', 'assets/victoria_J2.png');
        this.load.image('brillo', 'assets/brillo.png');
    }

    create() {


        //MUSICA
        menusfx2 = this.sound.add('menusfx');
        menu_musicj2 = this.sound.add('Menu_music');
        menu_musicj2.play();

        this.victoriaJ2 = this.add.image(400, 200, 'imagenVictoriaJ2');
        this.victoriaJ2.setScale(0.5);

        this.brillo = this.add.image(400, 200, 'brillo');
        this.brillo.setScale(1.33);

        this.background = this.add.image(400, 300, 'imagenf');
        this.background.setDepth(-1);

        var botonReiniciarJ2 = this.add.image(0, 0, 'botonRestart');
        this.botonDetectReiniciarJ2 = this.add.container(400, 400, [botonReiniciarJ2]);
        this.botonDetectReiniciarJ2.setSize(botonReiniciarJ2.height, botonReiniciarJ2.width);
        this.botonDetectReiniciarJ2.setInteractive();

        this.botonDetectReiniciarJ2.on('pointerdown', function () {
            this.scene.scene.start('MenuScene');
            //MUSICA
            location.reload();
        })

        this.botonDetectReiniciarJ2.on('pointerover', function () {
            botonReiniciarJ2.setScale(1.1)
        })

        this.botonDetectReiniciarJ2.on('pointerout', function () {
            botonReiniciarJ2.setScale(1)
        })
        lobbySocket.close();
        posSocket.close();
        shootSocket.close();

    }
    update() {

    }
}