package com.chanderelle.demo;

import java.util.List;
import java.util.ArrayList;

public class Lobby {

	private List<Mensaje> chat = new ArrayList<Mensaje>();
	private List<Jugador> jugadores = new ArrayList<Jugador>();

	public Lobby() {
		
	}
	
	public List<Jugador> getJugadores() {
		return jugadores;
	}

	public Jugador getJugador(int i) {
		return jugadores.get(i);
	}
	
	public void addj(Jugador jugador) {
		jugadores.add(jugador);
	}
	
	public void removeJugador(int id) {
		jugadores.remove(id);
	}

	public List<Mensaje> getChat() {
		return chat;
	}
	
	public void addm(Mensaje mensaje) {
		chat.add(mensaje);
	}

	@Override
	public String toString() {
			return jugadores.toString();
	}

}