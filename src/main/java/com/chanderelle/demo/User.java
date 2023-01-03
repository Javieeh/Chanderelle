package com.chanderelle.demo;

import org.springframework.web.socket.WebSocketSession;

public class User {
    private int id;
	private String nick;
	private WebSocketSession session;
	private boolean playing;

	public User(int id, WebSocketSession session) {
		this.id = id;
		this.nick = null;
		this.session = session;
		this.playing = false;
	}

	
	
	public int getId() {
		return id;
	}



	public void setId(int id) {
		this.id = id;
	}



	public String getNick() {
		return nick;
	}



	public void setNick(String nick) {
		this.nick = nick;
	}



	public WebSocketSession getSession() {
		return session;
	}



	public void setSession(WebSocketSession session) {
		this.session = session;
	}



	public boolean isPlaying() {
		return playing;
	}



	public void setPlaying(boolean playing) {
		this.playing = playing;
	}



	@Override
	public String toString() {
		return "Jugador [id=" + this.id + ", nombre=" + this.nick + "]";
	}
}
