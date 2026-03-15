/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.joao.prjchatservidor;

import java.util.List;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.Collections;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicInteger;

/**
 *
 * @author Joao Dias
 */
public class PrjChatServidor extends Thread{
    
    private Socket conexao;
    private String nome;
    private static List<PrintStream> usuarios = Collections.synchronizedList(new ArrayList<>());
    private static PainelControle painel;
    private static AtomicInteger numUsuarios = new AtomicInteger();
    private ExecutorService executor = Executors.newSingleThreadExecutor();

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
                painel.setNumUsuarios(numUsuarios.incrementAndGet());

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
                        String txtCaptura = nome + " digitou '" + c + "' em : " + mensagem + "\n";
                        painel.setCaptura(txtCaptura);
                        executor.execute(() -> {
                            ManiplaArquivo.escreverArq(txtCaptura, "log", true);
                        });
                        break;
                    }
                }
                
                synchronized (usuarios) {
                    for (PrintStream usuario : usuarios) {
                        usuario.println(nome + ": " + mensagem);
                    }
                }
            }
            
            painel.setNumUsuarios(numUsuarios.decrementAndGet());
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
