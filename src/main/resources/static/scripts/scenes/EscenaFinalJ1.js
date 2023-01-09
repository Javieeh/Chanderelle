
var menu_musicj1;
var menusfx1;
class EscenaFinalJ1 extends Phaser.Scene {

    constructor() {
        super('FinalSceneJ1');

        this.background;
        this.botonDetectReiniciar;
        this.victoriaJ1;
        this.brillo;
    }

    initialize() {
        Phaser.Scene.call(this, { key: 'FinalSceneJ1' });
    }

    preload() {
        this.load.image('imagenf', 'assets/game fondo.png');
        this.load.image('botonRestart', 'assets/restart.png');
        this.load.image('imagenVictoria', 'assets/victoria_j1.png');
        this.load.image('brillo', 'assets/brillo.png');

    }

    create() {


        //MUSICA
        menusfx1 = this.sound.add('menusfx');
        menu_musicj1 = this.sound.add('Menu_music');
        menu_musicj1.play();

        this.victoriaJ1 = this.add.image(400, 200, 'imagenVictoria');
        this.victoriaJ1.setScale(0.5);

        this.brillo = this.add.image(400, 200, 'brillo');
        this.brillo.setScale(1.33);

        this.background = this.add.image(400, 300, 'imagenf');
        this.background.setDepth(-1);

        var botonReiniciar = this.add.image(0, 0, 'botonRestart');
        this.botonDetectReiniciar = this.add.container(400, 400, [botonReiniciar]);
        this.botonDetectReiniciar.setSize(botonReiniciar.height, botonReiniciar.width);
        this.botonDetectReiniciar.setInteractive();

        this.botonDetectReiniciar.on('pointerdown', function () {
            this.scene.scene.start('MenuScene');
            //MUSICA
            menu_musicj1.stop();

        })

        this.botonDetectReiniciar.on('pointerover', function () {
            botonReiniciar.setScale(1.1)
        })

        this.botonDetectReiniciar.on('pointerout', function () {
            botonReiniciar.setScale(1)
        })


    }
    update() {

    }
}