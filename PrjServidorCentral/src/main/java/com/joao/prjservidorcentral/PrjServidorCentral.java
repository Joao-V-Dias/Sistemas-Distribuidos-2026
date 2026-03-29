/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.joao.prjservidorcentral;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

/**
 *
 * @author Joao Dias
 */
public class PrjServidorCentral {

    public static void main(String[] args) {
        try (ServerSocket server = new ServerSocket(2222)) {
            System.out.println("Servidor Central de Risco rodando na porta 2222...");

            while(true) {
                try {
                    Socket client = server.accept();
                    Core threadClient = new Core(client);
                    threadClient.start();
                } catch (IOException e) {
                    System.err.println("Erro ao aceitar conexão de um cliente: " + e.getMessage());
                }
            }
        } catch (IOException e) {
            System.err.println("Não foi possível iniciar o servidor: " + e.getMessage());
        }
    }
}
