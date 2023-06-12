package com.chanderelle.demo;
import java.io.BufferedReader;


import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.List;

public class File {
    
	public File() {
	}
	
	public void Write(String s){
		try {
			FileWriter file = new FileWriter("HistorialChat.txt",true);
			try(BufferedWriter buffer = new BufferedWriter(file)){
				buffer.write(s);
				buffer.newLine();
				buffer.close();
			}
			file.close();
		}catch(Exception ex){
			System.out.print("Error a la hora de escribir");	
		}
		
		
	}
	
	public List<String> Read() {
		List <String> data = new ArrayList<String>();
		try {
			FileReader archivo = new FileReader("HistorialChat.txt");
			try(BufferedReader lectura = new BufferedReader(archivo)){
				String s;
				while((s = lectura.readLine()) != null) {
					data.add(s);
				}
			}
		}catch(Exception ex) {
			System.out.print("Error a la hora de leer");
		}
		return data;
	}
}
