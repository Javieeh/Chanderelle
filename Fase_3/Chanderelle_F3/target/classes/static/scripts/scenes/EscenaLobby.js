var playerCount;
var id;
var playerUsername;
var title;
var space;

class EscenaLobby extends Phaser.Scene {

    constructor() {
        super("LobbyScene");
        this.botonExitDetect;
        this.botonConectDetect;
        this.botonMenu;
    }

    initialize() {
        Phaser.Scene.call(this, { key: 'LobbyScene' });
    }
    preload() {
        this.load.html("form", "form.html");
        this.load.image("scenelobby", "assets/chanderelle.png");
        this.load.image('boton', 'assets/jugar.png');
    }

    create() {

        this.idOfExitedPlayer = 0;
        this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.style = { font: "15px OCR A", fill: "#FFFFFF" };
        this.nameInput = this.add.dom(400, 125).createFromCache("form");

        var boton = this.add.image(0, 0, 'boton');
        boton.setScale(1);

        this.botonMenu = this.add.container(290, 40, [boton]);
        this.botonMenu.setSize(boton.height, boton.width);
        this.botonMenu.setInteractive();
        this.botonMenu.setScale(0.07);

        //Boton invisible
        this.botonMenu.on('pointerdown', function () {

            this.scene.scene.start('MenuScene');
            location.reload();
        })

        /////////////////////
        //////JUGADORES//////
        /////////////////////

        //Metodo GET para recibir numero de jugadores
        function Players() {
            $.ajax({
                method: "GET",
                url: window.location.href + 'lobby/valor',
            }).done(function (value) {
                playerCount = value;
                console.log(playerCount);
            })
        }


        //Crear jugadores
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
                    '<div><span ' + style + '>' + "Espera " + player.username + ", te estás conectado..." +
                    '</span>')
            })
        }

        //Mostrar jugadores conectados
        function showPlayer(player) {
            var style = 'color:red';
            $('#info-players').append(
                '<div id="' + playerUsername + '"><span ' + style + '>' + player.username +
                " esta online " + '</span>')
        }

        //Metodo GET para jugador
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

        //Borrar jugador segun su id
        function deletePlayer(playerId) {
            playerCount--;
            $.ajax({
                method: 'DELETE',
                url: window.location.href + 'lobby/' + playerId
            }).done(function (player) {
                var style = "";
                this.idOfExitedPlayer = playerId;
                console.log("Se ha salido del lobby el siguiente jugador: " + JSON.stringify(player));
                $('#info-players').append(
                    '<div><span ' + style + '>' + "Desconectando..." +
                    '</span>')
            })
        }

        ////////////////////
        //////MENSAJES//////
        ////////////////////

        //Crear mensaje
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
                callback(message);
            })
        }

        //Mostrar mensaje
        function showMessage(message) {
            $('#chat').append(
                '<div style="color:white"><span >' + message.content +
                '</span>')
        }


        //Gestion de botones para conectarse al servidor, desconectarse y mandar un mensaje
        $(document).ready(function () {
            $("#button-connect").click(function () {

                //Mostrar boton desconectar, input y boton enviar
                document.getElementById('divDisconnect').style.display = 'inline-block';

                var test_username = document.querySelector('#info-players');
                var uName = test_username.querySelector('input[name="username"]').value;
                playerUsername = uName
                var player = {
                    username: uName.value
                }
                player.username = playerUsername;
                createPlayer(player, function (player) {
                    showPlayer(player);
                })
                window.onbeforeunload = function () {
                    deletePlayer(id);
                };

                Players();

                setInterval(function loadChat() { //carga el chat
                    $('#chat').empty();
                    $.ajax({
                        method: "GET",
                        url: window.location.href + 'lobby'
                    }).done(function (chat) {
                        for (var i = 0; i < chat.length; i++) {
                            var style = 'color:white';
                            $('#chat').append('<div><span ' + style + '>' + chat[i] + '</span>')
                        }
                    });
                }, 3000);
                setInterval(function loadPlayers(callback) { //Carga los jugadores
                    $('#info-players').empty();
                    $.ajax({
                        url: window.location.href + 'lobby/jugadores'
                    }).done(function (Player) {
                        console.log('Jugadores Conectados: ' + JSON.stringify(Player));
                        for (var i = 0; i < Player.length; i++) {
                            showPlayer(Player[i]);
                        }
                    })
                }, 3000);
            })

            $("#dis-button").click(function () {

                deletePlayer(id);
                location.reload();

            })

            $("#send-button").click(function () {

                var test = document.querySelector('#input-form')
                var name = test.querySelector('input[name="name"]');
                var message = {
                    content: playerUsername + ": " + name.value,
                }
                name.value = "";
                //Creamos mensaje
                createMessage(message, function (msg) {
                    //Mostramos mensaje
                    showMessage(msg);
                });
            })
        })
    }

    update() {


    }
}