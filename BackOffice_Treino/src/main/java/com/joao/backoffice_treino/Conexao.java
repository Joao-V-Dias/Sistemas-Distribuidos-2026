/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.joao.backoffice_treino;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.net.Socket;

/**
 *
 * @author Joao Dias
 */
public class Conexao {
    
    private PrintStream saida;
    private BufferedReader entrada;
    private Socket server;
    
    public void criarConexao(){
        try{
            this.server = new Socket("127.0.0.1", 2222);
            this.saida = new PrintStream(server.getOutputStream());
            this.entrada = new BufferedReader(new InputStreamReader(server.getInputStream()));
        }catch(IOException ex){
            ex.printStackTrace();
        }
    }
    
    public void fecharConexao() throws IOException{
        server.close();
    }
    
    public String enviar(String cpf, String operacao) throws IOException{
        criarConexao();
        String mensagem = cpf + "," + operacao;
        saida.println(mensagem);
        var resposta = entrada.readLine();
        fecharConexao();
        return resposta;
    }
}
