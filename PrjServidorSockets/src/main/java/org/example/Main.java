package org.example;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.net.ServerSocket;
import java.net.Socket;

public class Main {
    static void main() {
        try{
            ServerSocket ss = new ServerSocket(2222);
            Socket conn = ss.accept();
            System.out.println("Conectou!!!");

            BufferedReader entrada = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            System.out.println(entrada.lines());
            PrintStream saida = new PrintStream(conn.getOutputStream());

            while(true){
                String linha = entrada.readLine();
                if(linha == null || linha.trim().isEmpty()){
                    System.out.println("Cliente desconectou.");
                    conn.close();
                    break;
                }
                System.out.println("Mensagem do cliente: " + linha);
                saida.println("Mensagem enviada pelo servidor: " + linha);
            }

        }catch (IOException e){
            System.out.println(e);
        }
    }
}





