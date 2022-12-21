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
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	
	@Override
	public String toString() {
		return "Mensaje [contenido=" + text + ", jugador=" + user + "]";
	}
}
