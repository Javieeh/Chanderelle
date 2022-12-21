package com.chanderelle.demo;

import java.util.List;

import java.util.ArrayList;

public class Lobby {
	
    private List<Message> chat = new ArrayList<Message>();
	private List<Player> playerList = new ArrayList<Player>();

	public Lobby() {
	}
	
	public List<Player> getPlayerList() {
		return playerList;
	}

	public Player getPlayer(int i) {
		return playerList.get(i);
	}
	
	public void addPlayer(Player _player) {
		playerList.add(_player);
	}
	
	public void removePlayer(int id) {
		playerList.remove(id);
	}

	public List<Message> getChat() {
		return chat;
	}
	
	public void addMessage(Message _message) {
		chat.add(_message);
	}

	@Override
	public String toString() {
			return playerList.toString();
	}
}
