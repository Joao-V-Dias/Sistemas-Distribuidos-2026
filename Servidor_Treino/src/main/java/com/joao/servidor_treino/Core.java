/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.joao.servidor_treino;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

/**
 *
 * @author Joao Dias
 */
public class Core extends Thread {

    private Socket conn;

    public Core(Socket client) {
        this.conn = client;
    }

    @Override
    public void run() {
        try (
                InputStreamReader isr = new InputStreamReader(conn.getInputStream()); BufferedReader leitorRede = new BufferedReader(isr); PrintWriter saida = new PrintWriter(conn.getOutputStream(), true)) {
            String[] mensagem = leitorRede.readLine().split(",");
            String cpfRecebido = mensagem[0];
            String tipo = mensagem[1].toUpperCase();

            String mensagemSaida = "";
            switch (tipo) {
                case "SALVAR" ->
                    mensagemSaida = salvar(cpfRecebido);
                case "CONSULTAR" ->
                    mensagemSaida = consultar(cpfRecebido);
                case "EXCLUIR" ->
                    mensagemSaida = excluir(cpfRecebido);
            }

            registrarLog(cpfRecebido, tipo);

            saida.println(mensagemSaida);

        } catch (IOException e) {
            System.err.println("Erro na thread de processamento: " + e.getMessage());
        } finally {
            try {
                if (!conn.isClosed()) {
                    conn.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public String salvar(String cpf) {
        if (ManipulaArquivo.verificarCpf(cpf, "inadimplentes")) {
            return "CPF ja registrado";
        }
        ManipulaArquivo.escreverArq(cpf, "inadimplentes", true);
        return "CPF registrado com sucesso";
    }

    public String consultar(String cpf) {
        if (cpf != null && !cpf.isEmpty()) {
            System.out.println("Consultando CPF: " + cpf);
            boolean bloqueado = ManipulaArquivo.verificarCpf(cpf, "inadimplentes");

            if (bloqueado) {
                return "NEGADO: CPF com restrição no sistema.";
            }
            return "APROVADO: Nenhuma restrição encontrada.";
        }
        return "CPF invalido";
    }

    public String excluir(String cpf) {
        if (ManipulaArquivo.excluirCpf(cpf, "inadimplentes")) {
            return "CPF removido com sucesso";
        }
        return "Erro ao excluir CPF";
    }

    public void registrarLog(String cpf, String tipo) {
        String log = "DATA: " + new java.util.Date() + " - CPF: " + cpf + " OPERACAO: " + tipo;
        ManipulaArquivo.escreverArq(log, "auditoria", true);
    }
}
