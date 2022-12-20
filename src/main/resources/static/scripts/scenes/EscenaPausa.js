class EscenaPausa extends Phaser.Scene {
    constructor() {
        super('PauseScene');

        this.background;
        this.boton1;
        this.botonDetect1;
        this.pausa;
    }

    initialize() {
        Phaser.Scene.call(this, { key: 'PauseScene' });
    }

    preload() {
        this.load.image('botonResume', 'assets/jugar.png')
        this.load.image('pausa', 'assets/pausa.png')
    }

    create() {

        this.pausa = this.physics.add.image(400, 50, 'pausa');
        this.pausa.body.setAllowGravity(false);
        this.pausa.setScale(1.0);

        this.boton1 = this.physics.add.image(0, 0, 'botonResume');
        this.boton1.body.setAllowGravity(false);

        this.botonDetect1 = this.add.container(400, 300, [this.boton1]);
        this.botonDetect1.setSize(this.boton1.height, this.boton1.width);
        this.botonDetect1.setInteractive();

        this.botonDetect1.on('pointerdown', function () {
            this.scene.scene.sleep('PauseScene');
            this.scene.scene.resume('GameScene');
        })


    }

    update() {

    } 1
}