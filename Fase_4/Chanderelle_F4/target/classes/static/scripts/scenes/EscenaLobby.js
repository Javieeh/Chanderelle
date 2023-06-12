var lobbyScenePointer;

var client_player = 0;
var p1_isConnected = false;
var p2_isConnected = false;

class EscenaLobby extends Phaser.Scene {

    constructor() {
        super('LobbyScene');

        this.J1_conectado;
        this.J2_conectado;
        this.J1_desconectado;
        this.J2_desconectado;

        this.conectando;
    }

    initialize() {
        Phaser.Scene.call(this, { key: 'LobbyScene' });
    }

    preload() {
        this.load.image("lobbyImage", "assets/WaitingPlayers.png");

        this.load.image("J1_conectado", "assets/J1_conectado.png");
        this.load.image("J2_conectado", "assets/J2_conectado.png");

        this.load.image("J1_desconectado", "assets/J1_desconectado.png");
        this.load.image("J2_desconectado", "assets/J2_desconectado.png");

        this.load.image("conectando", "assets/conectando.png");

    }

    create() {
        lobbyScenePointer = this;

        this.fondo = this.add.image(400, 300, 'lobbyImage');
        this.fondo.setDepth(0);
        this.fondo.setScale(1);

        this.J1_desconectado = this.add.image(200, 300, "J1_desconectado")
        this.J1_desconectado.setDepth(1);
        this.J1_desconectado.setScale(1);

        this.J2_desconectado = this.add.image(600, 300, "J2_desconectado")
        this.J2_desconectado.setDepth(1);
        this.J2_desconectado.setScale(1);

    }

    update() {
        //console.log("p1: " + p1_isConnected)
        //console.log("p2: " + p2_isConnected)
        if (p1_isConnected) {
            this.J1_desconectado.setDepth(-1);
            this.J1_conectado = this.add.image(200, 300, "J1_conectado")
            this.J1_conectado.setDepth(1);
            this.J1_conectado.setScale(1);
        }

        if (p2_isConnected) {
            this.J2_desconectado.setDepth(-1);
            this.J2_conectado = this.add.image(600, 300, "J2_conectado")
            this.J2_conectado.setDepth(1);
            this.J2_conectado.setScale(1);

            this.conectando = this.add.image(425, 500, "conectando")
            this.conectando.setDepth(1);
            this.conectando.setScale(1);
        }       
    } 
}




