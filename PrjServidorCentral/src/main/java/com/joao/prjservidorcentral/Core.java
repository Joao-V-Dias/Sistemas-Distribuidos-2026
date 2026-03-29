/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.joao.prjservidorcentral;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.Scanner;

/**
 *
 * @author Joao Dias
 */
public class Core extends Thread{
    private Socket conn;

    public Core(Socket client) {
        this.conn = client;
    }

    @Override
    public void run() {
        try (
            InputStreamReader isr = new InputStreamReader(conn.getInputStream());
            BufferedReader leitorRede = new BufferedReader(isr);

            PrintWriter saida = new PrintWriter(conn.getOutputStream(), true)
        ) {
            String cpfRecebido = leitorRede.readLine();

            if (cpfRecebido != null && !cpfRecebido.isEmpty()) {
                System.out.println("Consultando CPF: " + cpfRecebido);

                String log = "Data: " + new java.util.Date() + " - CPF: " + cpfRecebido;
                ManiplaArquivo.escreverArq(log, "auditoria", true);

                boolean bloqueado = ManiplaArquivo.verificarCpf(cpfRecebido, "inadimplentes");

                if (bloqueado) {
                    saida.println("NEGADO: CPF com restrição no sistema.");
                } else {
                    saida.println("APROVADO: Nenhuma restrição encontrada.");
                }
            }

        } catch (IOException e) {
            System.err.println("Erro na thread de processamento: " + e.getMessage());
        } finally {
            try {
                if (!conn.isClosed()) conn.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    
}
