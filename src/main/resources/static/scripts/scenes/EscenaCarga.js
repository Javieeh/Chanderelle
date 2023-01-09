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
    	  	this.scene.scene.start("GameScene");
       }   	  
	} 
}

var crearPartidaBool = false;
var startGame = false;
var barrera = true;
var ID_Partida = 0;
var SoyJ1 = false;
var J1_id = 10;
var J2_id = 10;

var socket = new WebSocket("ws://localhost:8080/chanderelle");

//Lo que el cliente envía al servidor
function createGame() {
	let message = {
		ID: 0,
		idJugador: J1_id,	
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
		startGame = msg.estadoPartida;
		console.log(msg.estadoPartida);		
		console.log("El id jugador del server es:"+ msg.idJugador);		
		break;
		
		case(5):
		J1_id = msg.idJugador;
		
		console.log(msg.mensaje);
		console.log(msg.idJugador);
		barrera= true;
		break;
		case(10):
		console.log("prueba superada")
		break;
		
	}
}	