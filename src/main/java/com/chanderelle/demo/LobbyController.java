package com.chanderelle.demo;

import java.io.BufferedWriter;


import java.io.FileWriter;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/lobby")
public class LobbyController {
    
	File file = new File();
	Lobby lobby = new Lobby();
	AtomicInteger nextId = new AtomicInteger(0);

    @GetMapping
	public List<String> chat() {
		return file.Read();
	}

    @GetMapping("/jugadores")
	public Collection<Player> players() {
		return lobby.getPlayerList();
	}
	
	@PostMapping("/mensaje")
	@ResponseStatus(HttpStatus.CREATED)
	public Message newMessage(@RequestBody Message _message) {
		lobby.addMessage(_message);
		file.Write(_message.getContent());
		return _message;
	}

    @PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Player newPlayer(@RequestBody Player _player) {

		int id = nextId.getAndIncrement();
		_player.setId(id);
		lobby.addPlayer(_player);

		return _player;
	}

    @GetMapping("/{id}")
	public ResponseEntity<Player> getPlayer(@PathVariable int id) {
		if(id < nextId.get()) {
			Player _player = lobby.getPlayer(id);
			if (_player != null) {
				return new ResponseEntity<>(_player, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}	
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}	
	}

    @DeleteMapping("/{id}")
	public ResponseEntity<Player> deletePlayer(@PathVariable int id) {
		for(int j = 0; j < lobby.getPlayerList().size(); j++) {
			if (id == lobby.getPlayerList().get(j).getId()) {
				Player _player = lobby.getPlayer(j);
				lobby.getPlayerList().remove(j);
				return new ResponseEntity<>(_player, HttpStatus.OK);
			}
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

    @GetMapping("/valor")
	public int getTotal() {
		return lobby.getPlayerList().size(); 
	}
}
