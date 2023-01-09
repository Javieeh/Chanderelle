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
	
	public int numGames = 0;
	final int NMAXGameS = 2;
	
	Game game = new Game();
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		
		JsonNode node = mapper.readTree(message.getPayload());
		int id = node.get("ID").asInt();
		
		ObjectNode msg = mapper.createObjectNode();
		ObjectNode msgAux = mapper.createObjectNode();



		
		switch(id) {
		
		case(0):

			/*
			int idLocal = 0;
			int idJug = node.get("idJugador").asInt();
			
			if(game.getEmpty()) {
				game = crearGame(0,usuarios.get(idJug));
				msg.put("playing", true);
				game.setEmpty(false);
				System.out.println("hola soy J11");
			} else if (!game.getEmpty() && !game.getFull()) {
				game = llenarGame(game,usuarios.get(idJug), msg);
				System.out.println("hola soy J2");
			}
		*/
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
			
			int idLocal = 0;

			Game game = new Game();
			String prueba = "Me he unido";
			
			if (numGames < NMAXGameS) {
				int idJug = node.get("idJugador").asInt();


				for(Game g: partidas) {
					if(g.getEmpty()) {
						crearGame(numGames, usuarios.get(idJug));
						msg.put("playing", true);
						g.setEmpty(false);
						game = g;
						System.out.println("hola soy J1");

						break;
					}
					else if (!g.getEmpty()) {
						llenarGame(g,usuarios.get(idJug), msg); 
						numGames++;
						game = g;
						System.out.println("hola soy J2");
						break;
					}
					idLocal++;					
				}
			}else {
				prueba = "No puedo crear Game (Reached Max Games)";
			}
			msg.put("idGame", idLocal);
			msgAux.put("idGame", idLocal);
			
			msg.put("idFuncion", 0);
			msg.put("stringPrueba", prueba);
			session.sendMessage(new TextMessage(msg.toString()));
			
			if (!game.getEmpty()) {
				WebSocketSession sesionLocalJ1 = game.getJ1().getSession();
				WebSocketSession sesionLocalJ2 = game.getJ2().getSession();
				
				msg.put("idFuncion", 4);
				msgAux.put("idFuncion", 4);
				
				msg.put("estadoGame", true);
				msgAux.put("estadoGame", true);
				
				sesionLocalJ1.sendMessage(new TextMessage(msg.toString()));
				sesionLocalJ2.sendMessage(new TextMessage(msgAux.toString()));
				System.err.println("He llegado");
				System.out.println("hola");
			}
			break;
		case(10):
			msg.put("idFuncion", 10);
			session.sendMessage(new TextMessage(msg.toString()));
			break;
		}
		
	}
	
	public Game crearGame(int ID, User player){ //Creación de Games
		player.setPlaying(true);
		Game p = new Game(ID, player); //Creo una Game por el constructor
		p.setEmpty(false); 
		p.setFull(false);
		return p;
	}
	
	public Game llenarGame(Game p, User J, ObjectNode msg){
		J.setPlaying(true);
		p.setJ2(J); //Añado a la Game el User 2
		p.setEmpty(false);
		p.setFull(true);
		return p;
		//Actualizo en la posición correspondiente esa Game
		//System.err.println("He llenado la Game con id: "+ p.getId());
	}
}
