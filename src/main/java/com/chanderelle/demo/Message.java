package com.chanderelle.demo;

public class Message {
	
    private String text;
	private User user;
	
	public Message() {
	}
	
	public String getContent() {
		return text;
	}
	public void setContent(String text) {
		this.text = text;
	}
	public User getPlayer() {
		return user;
	}
	public void setJugador(User _player) {
		this.user = _player;
	}
	
	@Override
	public String toString() {
		return "Mensaje [contenido=" + text + ", jugador=" + user + "]";
	}
}
