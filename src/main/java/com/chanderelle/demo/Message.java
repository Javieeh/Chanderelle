package com.chanderelle.demo;

public class Message {
	
    private String content;
	private Player player;
	
	public Message() {
	}
	
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Player getPlayer() {
		return player;
	}
	public void setJugador(Player _player) {
		this.player = _player;
	}
	
	@Override
	public String toString() {
		return "Mensaje [contenido=" + content + ", jugador=" + player + "]";
	}
}
