package com.chanderelle.demo;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;


public class WebSocketHandler extends TextWebSocketHandler {

	public ObjectMapper mapper = new ObjectMapper();
	public int numPartidas = 0;
	public User j1;
	public User j2;
	
	private void handler(TextMessage message, WebSocketSession session) throws JsonMappingException, JsonProcessingException {
		
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
			
			msgNode.put("idFuncion", 4);
			msgNodeAux.put("idFuncion", 4);
			
			msgNode.put("estadoPartida", true);
			msgNodeAux.put("estadoPartida", true);
			 
		}
		
	}
}
