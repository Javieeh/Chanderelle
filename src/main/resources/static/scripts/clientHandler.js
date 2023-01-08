var socket = new WebSocket("ws://localhost:8080/chanderelle");

//Lo que el cliente envía al servidor
function createGame() {
	var message = {
		ID: 0,
		idJugador: 0,	
	}	
	
	socket.send(JSON.stringify(message)); 
}	

function deleteGame() {
	var message = {
		ID: 1,	
	}	
	
	socket.send(JSON.stringify(message)); 
}

function playerJump() {
	var message = {
		ID: 2,
		idJugador: J1_id,	
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
	id = msg.ID
	switch(id){
		
		case(0):
		console.log("Partida creada");
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
		
		
		break;
			
		
	}
}	

