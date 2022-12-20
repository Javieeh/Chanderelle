package com.chanderelle.demo;

public class Mensaje{
	
	private String contenido;
	private Jugador jugador;
	
	public Mensaje() {
	}
	
	public String getContenido() {
		return contenido;
	}
	public void setContenido(String contenido) {
		this.contenido = contenido;
	}
	public Jugador getJugador() {
		return jugador;
	}
	public void setJugador(Jugador jugador) {
		this.jugador = jugador;
	}
	
	@Override
	public String toString() {
		return "Mensaje [contenido=" + contenido + ", jugador=" + jugador + "]";
	}
	
	
	
}
