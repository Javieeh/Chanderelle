package com.chanderelle.demo;

import java.time.LocalDateTime;

import org.springframework.web.socket.WebSocketSession;

public class User {
	private int ID;
	private WebSocketSession SESSION;
	private LocalDateTime Tiempo;
	private boolean inGame;
	
	
	 User(int id,  WebSocketSession session) { 
		this.ID = id;
		this.SESSION = session;
		this.Tiempo = LocalDateTime.now();
		this.inGame = false;
	}
	 User() { 
			this.Tiempo = LocalDateTime.now();
			this.inGame = false;
	}
	public int getID() {
		return ID;
	}
	public void setID(int iD) {
		ID = iD;
	}
	public WebSocketSession getSESSION() {
		return SESSION;
	}
	public void setSESSION(WebSocketSession sESSION) {
		SESSION = sESSION;
	}
	public LocalDateTime getTiempo() {
		return Tiempo;
	}
	public void setTiempo(LocalDateTime tiempo) {
		Tiempo = tiempo;
	}
	public boolean isInGame() {
		return inGame;
	}
	public void setInGame(boolean inGame) {
		this.inGame = inGame;
	}
	 
	
	
}
