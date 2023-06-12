package com.chanderelle.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@SpringBootApplication
@EnableWebSocket
public class ChanderelleV2Application implements WebSocketConfigurer {

	@Override
	public void registerWebSocketHandlers(
	WebSocketHandlerRegistry registry) {
	registry.addHandler(echoHandler(), "/chanderelle")
	.setAllowedOrigins("*");
	}
	
	@Bean
	public EchoHandler echoHandler() {
	return new EchoHandler();
	}
	
	public static void main(String[] args) {
		SpringApplication.run(ChanderelleV2Application.class, args);
	}
	

}
