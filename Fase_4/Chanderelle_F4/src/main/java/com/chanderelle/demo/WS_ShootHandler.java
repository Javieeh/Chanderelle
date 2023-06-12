package com.chanderelle.demo;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class WS_ShootHandler extends TextWebSocketHandler{
    public Map<String, WebSocketSession> users = new ConcurrentHashMap<>();
	
	public void afterConnectionEstablished(WebSocketSession session)throws Exception{
		if (users.size() < 2) {
			users.put(session.getId(), session);
		}
	}

	public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus)throws Exception {
		users.remove(session.getId());
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		
		for(WebSocketSession user : users.values()) {	
			if(!user.getId().equals(session.getId())){
				String msg = message.getPayload();
				user.sendMessage(new TextMessage(msg));
			}
		}
	}
}
