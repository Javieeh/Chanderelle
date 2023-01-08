package com.chanderelle.demo;
import org.springframework.web.socket.WebSocketSession;

public class Game {
	//Atributos
	private int ID;
	private User J1;
	private User J2;
	private Boolean full;
	private Boolean empty;
	
	//Constructores
	Game() {
		this.J1 = null;
		this.J2 = null;
		this.full = false;
		this.empty = true;
	}
	Game(int id, User j1) {
		this.J1 = j1;
		this.J2 = null;
		this.full = false;
		this.empty = false;
		this.ID = id;
	}
	//Getters y setters
	public int getId() {
		 return this.ID;
	}
	 
	 public void setId(int id) {
		 ID = id;
	}
	public User getJ1() {
		return J1;
	}
	public void setJ1(User j1) {
		J1 = j1;
	}
	public User getJ2() {
		return J2;
	}
	public void setJ2(User j2) {
		J2 = j2;
	}
	public Boolean getFull() {
		return full;
	}
	public void setFull(Boolean full) {
		this.full = full;
	}
	public Boolean getEmpty() {
		return empty;
	}
	public void setEmpty(Boolean empty) {
		this.empty = empty;
	}
	
	
}
