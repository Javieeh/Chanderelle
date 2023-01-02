function AddText(){
    var mensaje = document.getElementById("value-input");
    var chat = document.getElementById("pdivMESSAGES");

    chat.innerHTML+= mensaje.value+"<br> ";
}