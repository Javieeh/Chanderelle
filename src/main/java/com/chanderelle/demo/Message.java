package com.chanderelle.demo;

public class Message{
	
	private String contenido;
	private User user;
	
	public Message() {
	}
	
	public String getContenido() {
		return contenido;
	}
	public void setContenido(String contenido) {
		this.contenido = contenido;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	
	@Override
	public String toString() {
		return "Mensaje [contenido=" + contenido + ", jugador=" + user + "]";
	}
	
	
	
}
