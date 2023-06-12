package com.chanderelle.demo;

import java.time.LocalDateTime;

public class User {
	private int ID;
	private String username;
	private LocalDateTime Tiempo;
	
	
	User(int id) { 
		this.ID = id;
		this.Tiempo = LocalDateTime.now();
	}
	User() { 
			this.Tiempo = LocalDateTime.now();
	}
	public int getID() {
		return ID;
	}
	public void setID(int iD) {
		ID = iD;
	}
	public LocalDateTime getTiempo() {
		return Tiempo;
	}
	public void setTiempo(LocalDateTime tiempo) {
		Tiempo = tiempo;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String name) {
		this.username = name;
	}
	
	
}
