package com.chanderelle.demo;

public class User {
    private int id;
	private String nick;

	public User() {
	}

	public String getNick() {
		return nick;
	}

	public void setName(String _nick) {
		this.nick = nick;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
	@Override
	public String toString() {
		return "Jugador [id=" + id + ", nombre=" + nick + "]";
	}
}
