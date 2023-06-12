package com.chanderelle.demo;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class WS_LobbyHandler extends TextWebSocketHandler{
	
	public Map<String, WebSocketSession> users = new ConcurrentHashMap<>();
	public String user1_id = null;
	public String user2_id = null;

	public void afterConnectionEstablished(WebSocketSession session)throws Exception{

		if(users.size() < 2)
		{
			users.put(session.getId(), session);

			if(user1_id == null) {
				user1_id = session.getId();
				JSONObject json = new JSONObject();
				json.put("player", 1);
				json.put("type", "playerID");
				session.sendMessage(new TextMessage(json.toJSONString()));
			}
			else if(user2_id == null){
				user2_id = session.getId();
				JSONObject json = new JSONObject();
				json.put("player", 2);
				json.put("type", "playerID");
				session.sendMessage(new TextMessage(json.toJSONString()));	
			}

			if(users.size() == 2) {
				for(WebSocketSession user : users.values()) {
					JSONObject json = new JSONObject();
					json.put("player", "ready");
					json.put("type", "playerID");
					user.sendMessage(new TextMessage(json.toJSONString()));
				}
			}
		}
	}
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		
		

		ObjectMapper mapper = new ObjectMapper();
		JsonNode node = mapper.readTree(message.getPayload());
		
		if(node.get("type").asText().equals("play"))
		{
			
			for(WebSocketSession user : users.values()) {
				System.out.println(user1_id + " " + user2_id);
				JSONObject json = new JSONObject();
				json.put("type", "play");
				user.sendMessage(new TextMessage(json.toJSONString()));
			}
		}
		if(node.get("type").asText().equals("winJ1"))
		{
			for(WebSocketSession user : users.values()) {
				JSONObject json = new JSONObject();
				json.put("type", "winJ1");
				user.sendMessage(new TextMessage(json.toJSONString()));
			}
		}else if(node.get("type").asText().equals("winJ2"))
		{
			for(WebSocketSession user : users.values()) {
				JSONObject json = new JSONObject();
				json.put("type", "winJ2");
				user.sendMessage(new TextMessage(json.toJSONString()));
			}
		}		
	}
	
	public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus)throws Exception {
		
		if(session.getId() == user1_id)
		{
			user1_id = null;
		}
		if(session.getId() == user2_id)
		{
			
			user2_id = null;
		}
		users.remove(session.getId());
		for(WebSocketSession user : users.values()) {
			JSONObject json = new JSONObject();
			json.put("type", "disconnected");
			user.sendMessage(new TextMessage(json.toJSONString()));
		}
	}

	

	
	
}
