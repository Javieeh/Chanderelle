package com.chanderelle.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@SpringBootApplication
@Configuration
@EnableWebSocket
public class ChanderelleV2Application implements WebSocketConfigurer {

	@Override
	public void registerWebSocketHandlers(
			WebSocketHandlerRegistry registry) {
		registry.addHandler(lobbyHandler(), "/chanderelle/lobby").setAllowedOrigins("*");
		registry.addHandler(posHandler(), "/chanderelle/position").setAllowedOrigins("*");
		registry.addHandler(shootHandler(), "/chanderelle/shoot").setAllowedOrigins("*");

	}

	@Bean
	public WS_PosHandler posHandler() {
		return new WS_PosHandler();
	}
	@Bean
	public WS_LobbyHandler lobbyHandler() {
		return new WS_LobbyHandler();
	}
	
	@Bean
	public WS_ShootHandler shootHandler() {
		return new WS_ShootHandler();
	}

	public static void main(String[] args) {
		SpringApplication.run(ChanderelleV2Application.class, args);
	}

}
