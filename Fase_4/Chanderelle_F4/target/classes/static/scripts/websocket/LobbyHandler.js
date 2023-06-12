var lobbySocket;

var localPlayer;
var myLobbyTimeOut;
var gameCreated = false;

createLobby = function () {
	lobbySocket = new WebSocket("ws://localhost:8080/chanderelle/lobby");

	lobbySocket.onopen = function () { console.log("Lobby creada") }

	lobbySocket.onerror = function (e) {

		console.log("ERROR: " + e);
	}

	lobbySocket.onclose = function() {
		console.log("Cerrando Lobby socket...")
		p1_isConnected = false;
		p2_isConnected = false;
	}

	lobbySocket.sendWS = function (data) {

		let message = {
			type: data
		};
		var msg = JSON.stringify(message);
		lobbySocket.send(msg);
	}

	lobbySocket.onmessage = function (msg) {

		var data = JSON.parse(msg.data);

		if (data.type === "playerID") {
			if (data.player == 1) {
				p1_isConnected = true;
				localPlayer = data.player;
			}
			else if (data.player == 2) {
				p2_isConnected = true;
				localPlayer = data.player;
			}
			else if (data.player === "ready") {
				p1_isConnected = true;
				p2_isConnected = true;
			}
		}

		if (p1_isConnected && p2_isConnected) {
			if(!gameCreated){
				myLobbyTimeOut = setTimeout(function () { lobbySocket.sendWS("play") }, 5000);

			}
		}
		if(data.type === "play") {
			if(!gameCreated){
				lobbyScenePointer.scene.start('GameScene');
				createPosSocket();
				createShootSocket();
			    gameCreated = true;
				
			}	
		}

		if (data.type === "winJ1") {

			gameScenePointer.scene.start('FinalSceneJ1');
			
		}
		else if (data.type === "winJ2") {

			gameScenePointer.scene.start('FinalSceneJ2');
			
		}
	}
}


