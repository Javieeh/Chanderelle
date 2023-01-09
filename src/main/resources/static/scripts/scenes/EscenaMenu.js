

var menu_music;
var menusfx;

var crearPartidaBool = false;
var startGame = false;
var barrera = true;
var ID_Partida = 0;
var SoyJ1 = false;
var J1_id = 10;
var J2_id = 10;


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


        this.botonDetect = this.add.container(400, 500, [boton]);
        this.botonDetect.setSize(boton.height, boton.width);
        this.botonDetect.setInteractive();
        this.botonDetect.setScale(0.1);


        this.botonDetect.on('pointerdown', function () {
						
		  
            
        })

        this.botonDetect.on('pointerover', function () {
            boton.setScale(1.1)
        })

        this.botonDetect.on('pointerout', function () {
            boton.setScale(1)
        })
        
        
        
        this.botonChat = this.physics.add.image(0, 0, 'chat');
        this.botonChat.body.setAllowGravity(false);
        this.botonChat.setScale(1.1);

        this.botonDetectChat = this.add.container(400, 200, [this.botonChat]);
        this.botonDetectChat.setSize(this.botonChat.height, this.botonChat.width);
        this.botonDetectChat.setInteractive();
        this.botonDetectChat.setScale(0.1);

        this.botonDetectChat.on('pointerdown', function () {
            menusfx.play();
            
            this.scene.scene.start('LobbyScene');
        });


        //Musica
        menu_music = this.sound.add('Menu_music');
        menusfx = this.sound.add('menusfx');

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
			if ((crearPartidaBool == false) && (barrera == true)){
    		  createGame();
    		  console.log("He enviado petición para crear partida");
    		  crearPartidaBool = true;
    	  }
    	  if (startGame == true){
    	  	  menusfx.play();
              menu_music.stop();
              this.scene.scene.launch('PauseScene');
              this.scene.scene.launch('GameScene');
              this.scene.scene.sleep('PauseScene');
    	  }
    }

}

var socket = new WebSocket("ws://localhost:8080/chanderelle");

//Lo que el cliente envía al servidor
function createGame() {
	let message = {
		ID: 0,
		idJugador: J1_id,	
	}	
	socket.send(JSON.stringify(message)); 
}	

function deleteGame() {
	let message = {
		ID: 1,	
		idPartida: ID_Partida,
		idJugador: J1_id,
	}	
	
	socket.send(JSON.stringify(message)); 
}

function playerJump() {
	let message = {
		ID: 2,
		idJugador: J1_id,	
	}	
	
	socket.send(JSON.stringify(message)); 
}

function prueba() {
	var message = {
		ID: 10,
	}
	socket.send(JSON.stringify(message)); 
}



//Parte websockets
socket.onopen = function() {
	console.log("Conexión realizada");
}

//Manejamos lo que recibimos del servidor con un switch
socket.onmessage = function (event) {
	var msg = JSON.parse(event.data)
	id = msg.idFuncion;
	switch(id){
		
		case(0):
		ID_Partida = msg.idPartida;//EJEMPLO if(aux.Estado) // EN SERVER ESTARIA msg.put("Estado", partidas.getId(idpartida).getVacio();
		Soy_J1 = msg.soyJ1;
		console.log("aux " + msg.soyJ1);
		console.log("la buena " +Soy_J1);
		console.log(msg.stringPrueba);
		console.log(ID_Partida);
		break;
		
		case(1): 
		console.log("Partida borrada");
		break;
		
		case(2):
		console.log("Salto");
		break;
		
		case(4):
		StartGame = msg.estadoPartida;
		console.log(msg.estadoPartida);		
		console.log("El id jugador del server es:"+ msg.idJugador);		
		break;
		
		case(10):
		console.log("prueba superada")
		break;
		
	}
}	

