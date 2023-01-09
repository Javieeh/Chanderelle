var playerCount;
var id;
var name;
var title;
var space;

class EscenaLobby extends Phaser.Scene{
    
    constructor() {
        super("LobbyScene");
        this.botonExitDetect;
    }

	initialize() {
        Phaser.Scene.call(this, { key: 'Lobby' });
    }
    preload(){
        this.load.html("form", "form.html");
        this.load.image("scenelobby","assets/chanderelle.png");
    }

    create(){
		
		var botonE = this.add.image(0, 0, 'boton');
        botonE.setScale(1);
        botonE.setDepth(-500);

        this.botonExitDetect = this.add.container(740, 600, [botonE]);
        this.botonExitDetect.setSize(botonE.height, botonE.width);
        this.botonExitDetect.setInteractive();
        this.botonExitDetect.setScale(0.1);

        this.botonExitDetect.on('pointerdown', function () {

            this.scene.scene.start('MenuScene');

        })
		this.idOfExitedPlayer = 0;
		this.returnKey =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
		this.style = { font: "15px OCR A", fill: "#FFFFFF" };
        this.nameInput = this.add.dom(400, 125).createFromCache("form");

        setInterval(function loadChat() {
            $('#chat').empty();
            $.ajax({
               method: "GET",
               url: window.location.href + 'lobby'
           }).done(function (chat) {
               for (var i = 0; i < chat.length; i++) {
                   var style = 'color:white';
                   $('#chat').append('<div><span ' + style + '>' + chat[i] +'</span>')
               }
           });
        },3000);

        setInterval(function loadPlayers(callback) {
            $('#info-players').empty();
            $.ajax({
                url: window.location.href + 'lobby/jugadores'
            }).done(function (Player) {
                console.log('Jugadores Conectados: ' + JSON.stringify(Player));
                for (var i = 0; i < Player.length; i++) {
                    showPlayer(Player[i]);
                }
            })
        },3000);
        

        function Players(){
            $.ajax({
                method: "GET",
                url: window.location.href + 'lobby/valor',
            }).done(function (value) {
                playerCount = value;
                console.log(playerCount);
            })
        }

        //Create player in server
        function createPlayer(player, callback) {
            playerCount++;
            console.log(playerCount);
            $.ajax({
                method: "POST",
                url: window.location.href + 'lobby',
                data: JSON.stringify(player),
                processData: false,
                headers: {
                    "Content-Type": "application/json"
                }
            }).done(function (player) {
                var style = '';
                console.log("Se ha unido el siguiente jugador: " + JSON.stringify(player));
                
                id = player.id;
                callback(player);
                $('#info-players').append(
                    '<div><span ' + style + '>' + "Se ha conectado el Jugador " +  id +
                    '</span>')
            })
        }

        function createMessage(message, callback) {
            $.ajax({
                method: "POST",
                url: window.location.href + 'lobby/mensaje',
                data: JSON.stringify(message),
                processData: false,
                headers: {
                    "Content-Type": "application/json"
                }
            }).done(function (message) {
				
                console.log("Se ha escrito el siguiente mensaje: " + JSON.stringify(message));
                callback( message);
            })
        }

        
        //Get Player
        setInterval(function getJugador(total) {
            for (var i = 0; i <= total; i++) {
                $.ajax({
                    method: 'GET',
                    url: window.location.href + 'lobby/' + i
                }).done(function (player) {
                    console.log("Jugador " + JSON.stringify(player))
                })
                .fail(function () {
                    console.log("Jugador con id " + i + " no encontrado")
                })
            }
        }, 3000)
        

        //Delete player from server 
        function deletePlayer(playerId) {
            playerCount--;
            $.ajax({
                method: 'DELETE',
                url: window.location.href + 'lobby/' + playerId
            }).done(function (jugador) {
                var style = "";
                this.idOfExitedPlayer = playerId;
                console.log("Se ha salido del lobby el siguiente jugador: " + JSON.stringify(player));
                $('#info-players').append(
                    '<div><span ' + style + '>' + "El jugador " + playerId + " se ha desconectado" +
                    '</span>')
            })
        }

        //Show player connection
        function showPlayer(player) {
            var style = 'color:red';
            $('#info-players').append(
                '<div id="jugador-' + player.id + '"><span ' + style + '>' +"Jugador " + player.id +
                " esta online " + '</span>')
        }

        // Show message
        function showMessage(message) {
            var style = '';
            $('#chat').append(
                '<div style="color:white"><span >'+ message.content + 
                '</span>')
        }

        $(document).ready(function () {
            var player = {
                name: "Jugador "
            }
            createPlayer(player, function (Jugador) {
                //When item with id is returned from server
                showPlayer(Jugador);
            })
            window.onbeforeunload = function () {
                deletePlayer(id);
            };

            Players();

            var infoPlayer = $('#info-players')
            var input = $('#input')
            var chat = $('#chat')

            //Handle send button
            $("#send-button").click(function () {
                var test = document.querySelector('#input-form')
                var name = test.querySelector('input[name="name"]');
                var message = {
                    content:"Jugador "+ id + ": " + name.value,
                }
                name.value = "";
                createMessage(message, function (msg) {
                    //When item with id is returned from server
                    showMessage(msg);
                });
            })
        })
    }

    update() {
		if(this.returnKey.isDown){
            this.scene.start('selectorModeScene');
        }

    }
}