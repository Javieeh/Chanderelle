package com.chanderelle.demo;
import org.springframework.web.socket.WebSocketSession;

public class Game {
	private int ID;
	private User J1;
	private User J2;
	private Boolean vacio;
	private Boolean hayJ1;
	
	 Game() {
		this.ID = 0;
		this.J1 = null;
		this.J2 = null;
		this.vacio = true;
		this.hayJ1 = false;
	}
	 
	 Game(int id) {
		 this.ID = id;
		 this.J1 = null;
		 this.J2 = null;
		 this.vacio = true;
		 this.hayJ1 = false;
	 }
	 
	 Game(int id, User j1) {
			this.ID = id;
			this.J1 = j1;
			this.vacio = true;
			this.hayJ1 = true;
	}

	public int getID() {
		return ID;
	}

	public void setID(int iD) {
		ID = iD;
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

	public Boolean getVacio() {
		return vacio;
	}

	public void setVacio(Boolean vacio) {
		this.vacio = vacio;
	}

	public Boolean getHayJ1() {
		return hayJ1;
	}

	public void setHayJ1(Boolean hayJ1) {
		this.hayJ1 = hayJ1;
	}
	 
	
	
}
