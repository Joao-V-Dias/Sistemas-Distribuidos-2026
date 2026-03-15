/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.joao.prjchatcliente;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.net.Socket;

/**
 *
 * @author Joao Dias
 */
public class PrjChatCliente extends Thread{
    private Socket cliente;
    private PrintStream saida;
    private static Chat chat;
    
    public PrjChatCliente(String ip, int porta, String nome) throws IOException {
        this.cliente = new Socket(ip, porta);
        this.saida = new PrintStream(cliente.getOutputStream());
        chat = new Chat(this);
        
        saida.println(nome);
        
        Thread t = new PrjChatCliente(cliente);
        t.start();
        
        chat.setVisible(true);
    }

    public PrjChatCliente(Socket cliente) {
        this.cliente = cliente;
    }

    @Override
    public void run(){
        try {
            BufferedReader entrada = new BufferedReader(new InputStreamReader(cliente.getInputStream()));
            
            String mensagem;
            
            while((mensagem = entrada.readLine()) != null){
                chat.changeChat(mensagem);
            }
            
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }
    
    public void enviar(String mensagem){
        saida.println(mensagem);
    }
}
