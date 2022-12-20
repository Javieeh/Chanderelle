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
	
	Archivo a = new Archivo();
	Lobby l = new Lobby();
	AtomicInteger nextId = new AtomicInteger(0);
	
	
	@GetMapping
	public List<String> chat() {
		return a.Leer();
	}
	
	@GetMapping("/users")
	public Collection<User> users() {
		return l.getUsers();
	}
	
	@PostMapping("/messages")
	@ResponseStatus(HttpStatus.CREATED)
	public Message nuevoMensaje(@RequestBody Message mensaje) {
		l.addMessage(mensaje);
		a.Escribir(mensaje.getContenido());
		return mensaje;
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public User nuevoUser(@RequestBody User user) {

		int id = nextId.getAndIncrement();
		user.setId(id);
		l.addUser(user);

		return user;
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<User> getUser(@PathVariable int id) {
		if(id < nextId.get()) {
			User user = l.getUser(id);
			if (user != null) {
				return new ResponseEntity<>(user, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}	
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}	
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<User> borraUsER(@PathVariable int id) {
		for(int j = 0; j < l.getUsers().size(); j++) {
			if (id == l.getUsers().get(j).getId()) {
				User user = l.getUser(j);
				l.getUsers().remove(j);
				return new ResponseEntity<>(user, HttpStatus.OK);
			}
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@GetMapping("/valor")
	public int getTotal() {
		return l.getUsers().size(); 
	}
}