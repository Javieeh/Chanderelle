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


public class EchoHandler extends TextWebSocketHandler {

	public static ObjectMapper mapper = new ObjectMapper();
	public static List<Game> partidas = new CopyOnWriteArrayList <Game>();
	public static List<User> usuarios = new CopyOnWriteArrayList <User>();
	
	public int numPartidaActual = 0;
	final int N_PARTIDAS = 2;
	
	Game game = new Game();
	
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
					msg.put("soyJ1", true);
					break;
				}
				
				else if (p.getVacio()){ //SI HAY UN J1, compruebo si hay un J2
					llenarPartida(p, usuarios.get(idJug), msg); //Si no lo hay, lleno ese J2
					numPartidaActual++; //Aumento el número de partidas que existen
					f = p;
				    msg.put("soyJ1", false);
					break;
				}
				idLocal++;
			}
		}else {
			prueba = "No puedo crear partida (Reached Max Games)";
		}
		msg.put("idPartida", idLocal);
		msgaux.put("idPartida", idLocal);
		
		msg.put("idFuncion", 0);
		msg.put("stringPrueba", prueba);
		session.sendMessage(new TextMessage(msg.toString()));
		
		if (!f.getVacio()) {
			WebSocketSession sesionLocalJ1 = f.getJ1().getSESSION();
			WebSocketSession sesionLocalJ2 = f.getJ2().getSESSION();
			
			msg.put("idFuncion", 4);
			msgaux.put("idFuncion", 4);
			
			msg.put("estadoPartida", true);
			msgaux.put("estadoPartida", true);
			
			sesionLocalJ1.sendMessage(new TextMessage(msg.toString()));
			sesionLocalJ2.sendMessage(new TextMessage(msgaux.toString()));
			System.err.println("He llegado");
		}
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
}
