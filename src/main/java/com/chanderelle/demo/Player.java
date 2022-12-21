package com.chanderelle.demo;

public class Player {
    private int id;
	private String name;

	public Player() {
	}

	public String getName() {
		return name;
	}

	public void setName(String _name) {
		this.name = _name;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
	@Override
	public String toString() {
		return "Jugador [id=" + id + ", nombre=" + name + "]";
	}
}
