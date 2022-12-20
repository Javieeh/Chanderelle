package com.chanderelle.demo;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.List;

public class Archivo {
	
	public Archivo() {
		
	}
	
	public void Escribir(String cadena){
		try {
			FileWriter archivo = new FileWriter("Chat.txt",true);
			try(BufferedWriter almacen = new BufferedWriter(archivo)){
				almacen.write(cadena);
				almacen.newLine();
				almacen.close();
			}
			archivo.close();
		}catch(Exception ex){
			System.out.print("Error a la hora de escribir");	
		}
		
		
	}
	
	public List<String> Leer() {
		List <String> datos = new ArrayList<String>();
		try {
			FileReader archivo = new FileReader("Chat.txt");
			try(BufferedReader lectura = new BufferedReader(archivo)){
				String cadena;
				while((cadena = lectura.readLine()) != null) {
					datos.add(cadena);
				}
			}
		}catch(Exception ex) {
			System.out.print("Error a la hora de leer");
		}
		return datos;
	}	
}