package com.chanderelle.demo;

import java.util.List;

import java.util.ArrayList;

public class Lobby {
	
    private List<Message> chat = new ArrayList<Message>();
	private List<User> userList = new ArrayList<User>();

	public Lobby() {
	}
	
	public List<User> getPlayerList() {
		return userList;
	}

	public User getPlayer(int i) {
		return userList.get(i);
	}
	
	public void addPlayer(User _player) {
		userList.add(_player);
	}
	
	public void removePlayer(int id) {
		userList.remove(id);
	}

	public List<Message> getChat() {
		return chat;
	}
	
	public void addMessage(Message _message) {
		chat.add(_message);
	}

	@Override
	public String toString() {
			return userList.toString();
	}
}
