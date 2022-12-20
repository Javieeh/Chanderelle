class EscenaPausa extends Phaser.Scene {
    constructor() {
        super('PauseScene');

        this.background;
        this.boton1;
        this.botonDetect1;
        this.pausa;
        this.botonDetectChat;
        this.botonChat;
    }

    initialize() {
        Phaser.Scene.call(this, { key: 'PauseScene' });
    }

    preload() {
        this.load.image('botonResume', 'assets/jugar.png')
        this.load.image('pausa', 'assets/pausa.png')
        this.load.image('chat', 'assets/chat.png')
    }

    create() {

        //this.pausa = this.physics.add.image(400, 50, 'pausa');
        //this.pausa.body.setAllowGravity(false);
        //this.pausa.setScale(0.4);

        this.boton1 = this.physics.add.image(0, 0, 'botonResume');
        this.boton1.body.setAllowGravity(false);
        this.boton1.setScale(1);

        this.botonDetect1 = this.add.container(400, 300, [this.boton1]);
        this.botonDetect1.setSize(this.boton1.height, this.boton1.width);
        this.botonDetect1.setInteractive();
        this.botonDetect1.setScale(0.1);

        this.botonDetect1.on('pointerdown', function () {
            this.scene.scene.sleep('PauseScene');
            this.scene.scene.resume('GameScene');
        })

        this.botonChat = this.physics.add.image(0, 0, 'chat');
        this.botonChat.body.setAllowGravity(false);
        this.botonChat.setScale(1.1);

        this.botonDetectChat = this.add.container(400, 200, [this.botonChat]);
        this.botonDetectChat.setSize(this.botonChat.height, this.botonChat.width);
        this.botonDetectChat.setInteractive();
        this.botonDetectChat.setScale(0.1);

        this.botonDetectChat.on('pointerdown', function () {
            this.scene.scene.sleep('PauseScene');
            this.scene.scene.launch('Online');
        })
    }

    update() {

    } 1
}