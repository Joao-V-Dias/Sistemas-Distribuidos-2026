/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.joao.prjchatservidor;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;

/**
 *
 * @author Joao Dias
 */
public class PrjChatServidor extends Thread{
    
    private Socket conexao;
    private String nome;
    private static ArrayList<PrintStream> usuarios = new ArrayList();
    private static PainelControle painel;
    private static int numUsuarios;

    public PrjChatServidor(Socket conexao) {
        this.conexao = conexao;
    }

    public PrjChatServidor() {
    }
    
    public void init(int porta, Home home, PainelControle painel){
        try{
            this.painel = painel;
            ServerSocket server = new ServerSocket(porta);
            home.dispose();
            
            painel.setVisible(true);
            
            while(true){
                Socket cliente = server.accept();
                numUsuarios++;
                painel.setNumUsuarios(numUsuarios);

                Thread t = new PrjChatServidor(cliente);
                t.start();
            }
        }catch(IOException ex){
            ex.printStackTrace();
        }
    }
    
    @Override
    public void run(){
        try{
            BufferedReader entrada = new BufferedReader(new InputStreamReader(conexao.getInputStream()));
            PrintStream saida = new PrintStream(conexao.getOutputStream());
            
            nome = entrada.readLine();
            usuarios.add(saida);
            
            for(PrintStream usuario: usuarios){
                usuario.println(nome + " entrou no chat");
            }
        
            String mensagem;
            
            while((mensagem = entrada.readLine()) != null && !mensagem.trim().toLowerCase().equals("sair")){
                
                String[] chaves = painel.getTxtPalavras().split(";");
                
                for(String c: chaves){
                    if(mensagem.toLowerCase().contains(c.toLowerCase()) && !c.isBlank()){
                        painel.setCaptura(nome, c, mensagem);
                        break;
                    }
                }
                
                for(PrintStream usuario: usuarios){
                    usuario.println(nome + ": " + mensagem);
                }
            }
            
            numUsuarios--;
            painel.setNumUsuarios(numUsuarios);
            for(PrintStream usuario: usuarios){
                    usuario.println(nome + " saiu do chat");
                }
            usuarios.remove(saida);
            conexao.close();
        }catch(IOException ex){
            ex.printStackTrace();
        }
    }
}
