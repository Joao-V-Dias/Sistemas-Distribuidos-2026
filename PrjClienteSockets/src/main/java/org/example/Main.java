package org.example;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.net.Socket;

public class Main {
    static void main() {
        try {
            Socket conn = new Socket("127.0.0.1", 2222);

            BufferedReader entrada = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            PrintStream saida = new PrintStream(conn.getOutputStream());
            String linha;
            String retornoServ;
            BufferedReader teclado = new BufferedReader(new InputStreamReader(System.in));

            while(true){
                System.out.print(">> ");
                linha = teclado.readLine();

                saida.println(linha);
                retornoServ = entrada.readLine();
                if(retornoServ == null){
                    System.out.println("Conexao encerrada!");
                    break;
                }

                System.out.println(retornoServ);
            }
        } catch (IOException e) {
            System.out.println(e);
        }
    }
}
