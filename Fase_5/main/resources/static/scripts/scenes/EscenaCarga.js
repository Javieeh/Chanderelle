class EscenaCarga extends Phaser.Scene {
	
    constructor() {
        super("LoadScene");
        
        this.fondo;
    }
    
    initialize() {
        Phaser.Scene.call(this, { key: 'LoadScene' });
        
    }
    
    preload(){
      this.load.image('fondoMenu', 'assets/chanderelle.png');
    }
       
    create (){
		createUser();
        this.fondo = this.add.image(400, 300, 'fondoMenu');
        this.fondo.setDepth(-1);
        this.fondo.setScale(0.5);
      }
      update () {
    	  if ((crearPartidaBool == false) && (barrera == true)){
    		  createGame();
    		  console.log("He enviado petición para crear partida");
    		  crearPartidaBool = true;
    	  }
    	  if (startGame == true){
    	  	this.scene.start("GameScene");
       }   	  
	} 
}

var crearPartidaBool = false;
var startGame = false;
var barrera = false;
var ID_Partida = 0;
var SoyJ1 = false;
var J1_id;
var J2_id;

var socket = new WebSocket("ws://localhost:8080/chanderelle");

//Lo que el cliente envía al servidor
function createGame() {
	let message = {
		ID: 0,
		//idJugador: J1_id,	
	}	
	socket.send(JSON.stringify(message)); 
}	

function createUser() {
	let message = {
		ID: 5,
	}
	socket.send(JSON.stringify(message)); 
}

function deleteGame() {
	let message = {
		ID: 1,	
		idPartida: ID_Partida,
		idJugador: ID_Jugador,
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
		ID_Partida = msg.idPartida;
		if (msg.soyJ1 == false) {
			console.log("Los jugadores se han unido a la partida: " + ID_Partida);
		} 
		else {
		Soy_J1 = msg.soyJ1;
		console.log(msg.stringPrueba);
		}	
		break;
		
		case(1): 
		console.log("Partida borrada");
		break;
		
		case(2):
		console.log("Salto");
		break;
		
		case(4):
	
		break;
		
		case(5):
		
		//J1_id = msg.idJugador;		
		console.log(msg.mensaje);
		barrera= true;
		break;
		case(10):
		console.log("prueba superada")
		break;
		
	}
}	