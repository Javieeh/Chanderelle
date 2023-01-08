package com.chanderelle.demo;

import java.io.IOException;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;


public class EchoHandler extends TextWebSocketHandler {

	public static ObjectMapper mapper = new ObjectMapper();
	public int numPartidas = 0;
	public static User j1;
	public static User j2;
	
	protected void handler(TextMessage message, WebSocketSession session) throws Exception {
		
		JsonNode node = mapper.readTree(message.getPayload());
		int id = node.get("ID").asInt();
		
		ObjectNode msgNode = mapper.createObjectNode();
		ObjectNode msgNodeAux = mapper.createObjectNode();
		
		
		
		switch(id) {
		
		case(0):
			j1 = new User(0, session);
			j2 = new User(1, session);
			
			Game game = new Game(j1, j2);
			
			j1.setPlaying(true);
			j2.setPlaying(true);
			
			WebSocketSession sesionLocalJ1 = game.getJ1().getSession();
			WebSocketSession sesionLocalJ2 = game.getJ2().getSession();
			
			msgNode.put("ID", 0);
			msgNodeAux.put("ID", 0);
			
			msgNode.put("estadoPartida", true);
			msgNodeAux.put("estadoPartida", true);
			
			sesionLocalJ1.sendMessage(new TextMessage(msgNode.toString()));
			sesionLocalJ2.sendMessage(new TextMessage(msgNodeAux.toString()));
 
		}
		
	}
}
