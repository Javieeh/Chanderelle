package com.chanderelle.demo;

import java.util.List;
import java.util.ArrayList;

public class Lobby {

	private List<Message> chat = new ArrayList<Message>();
	private List<User> users = new ArrayList<User>();

	public Lobby() {
		
	}
	
	public List<User> getUsers() {
		return users;
	}

	public User getUser(int i) {
		return users.get(i);
	}
	
	public void addUser(User user) {
		users.add(user);
	}
	
	public void removeUser(int id) {
		users.remove(id);
	}

	public List<Message> getChat() {
		return chat;
	}
	
	public void addMessage(Message message) {
		chat.add(message);
	}

	@Override
	public String toString() {
			return users.toString();
	}

}