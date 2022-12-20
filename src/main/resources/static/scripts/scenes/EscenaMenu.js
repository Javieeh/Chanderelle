class EscenaMenu extends Phaser.Scene {

    constructor() {
        super('MenuScene');

        this.fondo;
        this.botonDetect;
    }

    initialize() {
        Phaser.Scene.call(this, { key: 'MenuScene' });
    }

    preload() {
        this.load.image('fondoMenu', 'assets/chanderelle.png');
        this.load.image('boton', 'assets/jugar.png');
    }

    create() {

        this.fondo = this.add.image(400, 300, 'fondoMenu');
        this.fondo.setDepth(-1);
        this.fondo.setScale(0.5);



        var boton = this.add.image(0, 0, 'boton');
        boton.setScale(1);


        this.botonDetect = this.add.container(400, 500, [boton]);
        this.botonDetect.setSize(boton.height, boton.width);
        this.botonDetect.setInteractive();
        this.botonDetect.setScale(0.1);


        this.botonDetect.on('pointerdown', function () {
            this.scene.scene.launch('PauseScene');
            this.scene.scene.launch('GameScene');
            this.scene.scene.sleep('PauseScene');
        })

        this.botonDetect.on('pointerover', function () {
            boton.setScale(1.1)
        })

        this.botonDetect.on('pointerout', function () {
            boton.setScale(1)
        })

    }

    update() {

    }

}