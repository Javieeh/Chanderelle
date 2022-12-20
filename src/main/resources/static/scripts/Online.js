var totales;
var id;
class Online extends Phaser.Scene{
    constructor(){
        super({key: 'Online'})
    }
    init(){
        this.keySpace =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    preload(){
        this.load.html("form", "form.html");
    }
    create() {	
		this.style = { font: "15px OCR A", fill: "#FFFFFF" };
        this.add.text(10, 10, 'Para salir pulsa la barra espaciadora', this.style);
        this.nameInput = this.add.dom(250, 150).createFromCache("form");

        this.message = this.add.text(100, 50, "Este es el chat", {
        color: "#FFFFFF",
        fontSize: 20,
        fontStyle: "bold"
        }).setOrigin(0.5);
setInterval(function loadChat() {
	 $('#info').empty();
	 $.ajax({
		method: "GET",
        url: window.location.href + '/lobby'
    }).done(function (chat) {
        for (var i = 0; i < chat.length; i++) {
			var style = '';
            $('#info').append(
       		'<div><span ' + style + '>' + chat[i] +
        	'</span>')
        }
    });
    },3000);
setInterval(function loadJugadores(callback) {
	$('#info2').empty();
	 $.ajax({
        url: window.location.href + '/lobby/jugadores'
    }).done(function (Jugador) {
	 	console.log('Jugador: ' + JSON.stringify(Jugador));
        for (var i = 0; i < Jugador.length; i++) {
            showJugador(Jugador[i]);
        }
    })
},3000);    
    
    function Jugadorest(){
	$.ajax({
        method: "GET",
        url: window.location.href + '/lobby/valor',
    }).done(function (valor) {
        totales=valor;
        console.log(totales);
    })
}


//Create jugador in server
function createJugador(jugador, callback) {
	totales++;
	console.log(totales);
    $.ajax({
        method: "POST",
        url: window.location.href + '/lobby',
        data: JSON.stringify(jugador),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (jugador) {
		var style = '';
        console.log("Se ha unido el siguiente jugador: " + JSON.stringify(jugador));
        id = jugador.id;
        callback(jugador);
         $('#info').append(
       		'<div><span ' + style + '>' + "Se ha conectado el jugador " + jugador.nombre +
        	'</span>')
    })
}

//Create jugador in server
function createMensaje(mensaje, callback) {
    $.ajax({
        method: "POST",
        url: window.location.href + '/lobby/mensaje/',
        data: JSON.stringify(mensaje),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (mensaje) {
        console.log("Se ha escrito el siguiente mensaje: " + JSON.stringify(mensaje));
        callback(mensaje);
    })
}

//Get jugador
setInterval(function getJugador(totales) {
	for (var i = 0; i <= totales ; i++){
    	$.ajax({
        	method: 'GET',
        	url: window.location.href + '/lobby/' + i
    	}).done(function (jugador) {
        console.log("Jugador " + JSON.stringify(jugador))
    })
    .fail(function (){
	console.log("Jugador con id " + i + " no encontrado")
})
	}
}, 3000)

//Delete item from server
function deleteJugador(jugadorID) {
	totales--;
    $.ajax({
        method: 'DELETE',
        url: window.location.href + '/lobby/' + jugadorID
    }).done(function (jugador) {
		var style = "";
        console.log("Deleted jugador " + jugadorID)
        $('#info').append(
       		'<div><span ' + style + '>' + "Se ha desconectado el jugador " + jugadorID +
        	'</span>')
    })
}

//Show item in page
function showJugador(jugador) {
    var style = '';

    $('#info2').append(
        '<div id="jugador-' + jugador.id + '"><span ' + style + '>' + jugador.nombre + " " + jugador.id +
        '</span>')
}

function showMensaje(Mensaje) {
    var style = '';

     $('#info').append(
       		'<div><span ' + style + '>' + Mensaje.contenido +
        	'</span>')
}

$(document).ready(function () {
       var jugador = {
		nombre: "aleatorio"
        }
   			createJugador(jugador,  function (Jugador) {
            //When item with id is returned from server
            showJugador(Jugador);
        })
        window.onbeforeunload = function () {
   			deleteJugador(id);
		};
	
    Jugadorest();
    

	var inputplayer = $('#value-input2')
	var infoplayer = $('#info2')
    var input = $('#value-input')
    var info = $('#info')

    //Handle add button
    $("#add-button").click(function () {
       var test = document.querySelector('#input-form')
	   var name = test.querySelector('input[name="name"]');
        var mensaje = {
            contenido: name.value,
        }
        name.value="";
        createMensaje(mensaje, function (Mensaje) {
            //When item with id is returned from server
            showMensaje(Mensaje);
        });
    })
})
    }
    update(){
 		if(this.keySpace.isDown){
            this.scene.start('Mainmenu');
        }
    }
}