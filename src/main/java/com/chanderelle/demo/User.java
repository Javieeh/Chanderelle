package com.chanderelle.demo;

public class User {
	
	private int id;
	private String nick;

	public User() {
	}

	public String getNick() {
		return nick;
	}

	public void setNick(String s) {
		this.nick = s;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
	@Override
	public String toString() {
		return "Jugador [id=" + id + ", nick=" + nick + "]";
	}

}
