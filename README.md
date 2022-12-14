# Chanderelle

### Descripción de la temática del juego
###### Chanderelle es un juego de plataformas y combates 1 vs 1 en vista lateral. Cada jugador podrá escoger entre distintas setas, que han cobrado vida debido a una negligencia en un laboratorio y a una serie de catastróficos acontecimientos y se ven obligadas a pelear entre ellas para seguir existiendo.
### Integrantes del equipo de desarrollo:
###### -Jaime Hereza Niño, j.hereza.2020@alumnos.urjc.es, JimyHN
###### -Lucas Andosilla Herráiz, l.andosilla.2019@alumnos.urjc.es, LucasAH9
###### -Lucía Beatriz Piqueras Garví, lb.piqueras.2019@alumnos.urjc.es, LuciaBPG
###### -Laura Vázquez Pereda, l.vazquezp.2020@alumnos.urjc.es, lauravazquezz
###### -Daniel Maseda Padilla, d.maseda.2020@alumnos.urjc.es, DMasedaP
###### -Javier de las Peñas Fernández, j.delaspenas.2020@alumnos.urjc.es, Javieeh
### Para jugarlo - Itch.io 
###### https://lucasah.itch.io/chanderellethegame
### Trello
###### https://trello.com/w/chanderelle
### ESCENAS
##### Se muestra el titulo del juego junto a un botón "jugar" con el que los jugadores comienzan la partida.
![Menu](src/main/resources/static/capturas_juego/menu.PNG)
##### Lobby donde se muestran los jugadores conectados y un chat donde se muestra los mensajes y sus autores.
![Menu](src/main/resources/static/capturas_juego/chat.png)
###
##### En pantalla se encuentran en escenario conformado por una serie de plataformas de hojas, en estas los jugadores pueden subirse para alcanzar una ventaja táctica sobre el enemigo así como cubrirse de los disparos rivales. A su vez, en la parte superior, se encuentran las vidas de cada jugador identificadas por la imagen de su personaje, siendo estas de un máximo de 3. Finalmente podemos identificar los personajes en juego como las setas rosa y blanca.
![Juego](src/main/resources/static/capturas_juego/juego.png)
###
##### Se muestra una imagen en la parte superior indicando a los jugadores que se encuentran en pantalla de pausa. A su vez en el centro de la pantalla se halla un botón "jugar" con el que se reanuda la partida.
![MenuPausa](src/main/resources/static/capturas_juego/menuPausa.png)
###
##### Se muestra una imagen en la parte superior indicando que el jugador 1 ha sido el vencedor. Abajo de esta indicación hay un boton de reinicio que permite volver al menú principal para jugar otra partida.
![victoria_J1](src/main/resources/static/capturas_juego/victoria_J1.PNG)
###
##### Se muestra una imagen en la parte superior indicando que el jugador 2 ha sido el vencedor. Abajo de esta indicación hay un boton de reinicio que permite volver al menú principal para jugar otra partida.
![victoria_J2](src/main/resources/static/capturas_juego/victoria_J2.PNG)
### DIAGRAMA DE ESCENAS
![Menu](src/main/resources/static/capturas_juego/diagrama_de_estados.png)
##### En este menú se muestra el desplazamiento que puede hacer el jugador entre las escenas. En primer lugar, desde el menú principal solo puede acceder al juego, desde el juego al menú de pausa, y al de victoria de cada jugador. Desde estos se puede acceder al menu principal otra vez.
### DIAGRAMA DE CLASES API REST
![Diagrama_de_Clases](src/main/resources/static/capturas_juego/Diagrama_de_Clases.png)
### DISEÑO
##### Para el diseño del juego se han usado colores que podemos encontrar en profundos bosques y que inspiran tenebrosidad, como el verde oscuro o el morado. Además las setas diseñadas tienen formas que recuerdan a la humana, para intentar personificarlas. Los botones y letreros se han hecho en dorado para que destaquen entre el ambiente tenebroso. También se han añadido efectos como luciérnagas volando por la pantalla para darle dinamismo al escenario. 
### CONTROLES
#### JUGADOR 1
##### Salto- W
##### Izquierda - A
##### Derecha - D
##### disparo - C
#### JUGADOR 2
##### Salto- Flecha arriba
##### Izquierda - Flecha izq.
##### Derecha - Flecha dcha.
##### disparo - M
