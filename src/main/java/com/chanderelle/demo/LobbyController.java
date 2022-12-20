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
	
	@GetMapping("/jugadores")
	public Collection<Jugador> jugadores() {
		return l.getJugadores();
	}
	
	@PostMapping("/mensaje")
	@ResponseStatus(HttpStatus.CREATED)
	public Mensaje nuevoMensaje(@RequestBody Mensaje mensaje) {
		l.addm(mensaje);
		a.Escribir(mensaje.getContenido());
		return mensaje;
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Jugador nuevoJugador(@RequestBody Jugador jugador) {

		int id = nextId.getAndIncrement();
		jugador.setId(id);
		l.addj(jugador);

		return jugador;
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Jugador> getJugador(@PathVariable int id) {
		if(id < nextId.get()) {
			Jugador jugador = l.getJugador(id);
			if (jugador != null) {
				return new ResponseEntity<>(jugador, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}	
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}	
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Jugador> borraJugador(@PathVariable int id) {
		for(int j = 0; j < l.getJugadores().size(); j++) {
			if (id == l.getJugadores().get(j).getId()) {
				Jugador jugador = l.getJugador(j);
				l.getJugadores().remove(j);
				return new ResponseEntity<>(jugador, HttpStatus.OK);
			}
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@GetMapping("/valor")
	public int getTotal() {
		return l.getJugadores().size(); 
	}
}