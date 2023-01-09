package com.chanderelle.demo;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import juegosenred.practica4.Jugador;
import juegosenred.practica4.Partida;


public class EchoHandler extends TextWebSocketHandler {

	public static ObjectMapper mapper = new ObjectMapper();
	public static List<Game> partidas = new CopyOnWriteArrayList <Game>();
	public static List<User> usuarios = new CopyOnWriteArrayList <User>();
	
	public int numPartidaActual = 0;
	final int N_PARTIDAS = 2;
	
	boolean primeravez = true;
	int numJugadoresActual = 0;
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		
		JsonNode node = mapper.readTree(message.getPayload());
		int id = node.get("ID").asInt();
		
		ObjectNode msg = mapper.createObjectNode();
		ObjectNode msgaux = mapper.createObjectNode();

		switch(id) {
		
		case(0):
		
		int idLocal = 0;
		Game f = new Game();
		String prueba = "Me he unido a una partida";
		if (numPartidaActual < N_PARTIDAS) {
			int idJug = node.get("idJugador").asInt();
			
			for (Game p: partidas){//Recorro mi lista por cada elemento partida
				
				if (!p.getHayJ1()) { //SI NO HAY J1 (es decir, no hay jugadores)
					crearPartida(numPartidaActual, usuarios.get(idJug));//Llamo a mi función crearPartida con los datos necesarios
					break;
				}
				else if(p.getVacio()) {
					llenarPartida(f, usuarios.get(idJug), msg);
					numPartidaActual++; //Aumento el número de partidas que existen
					f = p;
				    msg.put("soyJ1", false);
				    break;
				}
				idLocal++;
			}
		}
			else {
				prueba = "No puedo crear partida (Reached Max Games)";
			}
			msg.put("idPartida", idLocal);
			msgaux.put("idPartida", idLocal);
			
			msg.put("idFuncion", 0);
			msg.put("stringPrueba", prueba);
			session.sendMessage(new TextMessage(msg.toString()));
			
			if (!f.getVacio()){ //SI HAY UN J1, compruebo si hay un J2
				
			    
			    WebSocketSession sesionLocalJ1 = f.getJ1().getSESSION();
				WebSocketSession sesionLocalJ2 = f.getJ2().getSESSION();
				
				msg.put("idFuncion", 4);
				msgaux.put("idFuncion", 4);
				
				msg.put("estadoPartida", true);
				msgaux.put("estadoPartida", true);
				
				sesionLocalJ1.sendMessage(new TextMessage(msg.toString()));
				sesionLocalJ1.sendMessage(new TextMessage(msgaux.toString()));
				System.err.println("He llegado");
				break;
			}
			
		case(5):
			if(primeravez) {
				inicializar();
				primeravez=false;
			}
			int idLocalisimo = 0;
			 //Si hay menos de 8 jugadores (indices de 0 a 7)
				for (User x : usuarios) {
					if (!x.isInGame()) {
						User j = new User (idLocalisimo,session); // Creo al jugador con la sesion del WebSocket
						int skin = node.get("idskin").asInt(); //Cojo del cliente la skin que ha elegido.
						j.setSESSION(session); //Guardo en la instancia del jugador la sesion (por si me hiciera falta) 
						numJugadoresActual++; //Actualizo el numero de jugadores que hay en el server
						usuarios.set(idLocalisimo, j);//Añado mi jugador a la lista en la posición correspondiente
						msg.put("idJugador", numJugadoresActual-1); //Le envio el id al jugador para que lo guarde, esto sera util cuando necesite saber en otros métodos que id tiene ese jugador
						String textito = "Se ha creado el jugador "+ (numJugadoresActual-1); //MENSAJE DEBUG(SOBRA)
						msg.put("mensaje", textito); //Debug
						break;
					}
					idLocalisimo++;
				}
				
			msg.put("idFuncion", 5); //La función en cliente que quiero que haga al recibir el mensaje del servidor
			session.sendMessage(new TextMessage(msg.toString())); //Envio el mensaje
			
			break;
			
		case(10):
			msg.put("idFuncion", 10);
			session.sendMessage(new TextMessage(msg.toString()));
			break;
		}
	}
	
	public void crearPartida(int ID, User player){ //Creación de partidas
		player.setInGame(true);
		Game p = new Game(ID, player); //Creo una partida por el constructor
		p.setHayJ1(true); 
		partidas.set(ID,p);//añado esa partida a la posición correspondiente (QUE COINCIDE CON SU ID)
		//System.err.println("He creado una nueva partida con id: "+ ID);
	}
	
	public void llenarPartida(Game p, User J, ObjectNode msg){
		J.setInGame(true);
		p.setJ2(J); //Añado a la partida el jugador 2
		p.setVacio(false); 
		partidas.set(p.getID(), p);
		//Actualizo en la posición correspondiente esa partida
		//System.err.println("He llenado la partida con id: "+ p.getId());
	}
	
	public void inicializar() { // Cuando se inicie el server, lleno mi lista de partidas de elementos partida con valores por defecto para poder recorrer el for each de creación de partidas.
		Game p = new Game();
		for (int i = 0; i < N_PARTIDAS; i++) {
			p.setID(i);
			partidas.add(p);
		}
		User s = new User();
		
		usuarios.add(s);
		
	}
}
