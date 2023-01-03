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
	
	private void handler(TextMessage message, WebSocketSession session) throws JsonMappingException, JsonProcessingException {
		
		JsonNode node = mapper.readTree(message.getPayload());
		int id = node.get("ID").asInt();
		
		ObjectNode msgNode = mapper.createObjectNode();
		ObjectNode msgNodeAux = mapper.createObjectNode();
		
		switch(id) {
		
		
		}
		
	}
}
