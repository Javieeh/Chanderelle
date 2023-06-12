package com.chanderelle.demo;

import java.util.List;

import java.util.ArrayList;

public class Lobby {
	
    private List<Message> chat = new ArrayList<Message>();
	private List<User> userList = new ArrayList<User>();

	public Lobby() {
	}
	
	public List<User> getUserList() {
		return userList;
	}

	public User getUser(int i) {
		return userList.get(i);
	}
	
	public void addUser(User player) {
		userList.add(player);
	}
	
	public void removeUser(int id) {
		userList.remove(id);
	}

	public List<Message> getChat() {
		return chat;
	}
	
	public void addMessage(Message message) {
		chat.add(message);
	}

	@Override
	public String toString() {
			return userList.toString();
	}
}
