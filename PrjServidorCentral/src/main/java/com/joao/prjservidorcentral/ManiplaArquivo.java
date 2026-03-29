/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.joao.prjservidorcentral;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

/**
 *
 * @author Joao Dias
 */
public class ManiplaArquivo {
    
    public static synchronized void escreverArq(String texto, String nomeArq, boolean manter) {
        try (FileWriter fw = new FileWriter("c:\\" + nomeArq + ".txt", manter);
            PrintWriter pw = new PrintWriter(fw)) {
            pw.println(texto);
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }

    public static synchronized boolean verificarCpf(String cpf, String nomeArq) {
        try (BufferedReader br = new BufferedReader(new FileReader("c:\\" + nomeArq + ".txt"))) {
            String linha;
            while ((linha = br.readLine()) != null) {
                if (linha.trim().equals(cpf.trim())) {
                    return true;
                }
            }
        } catch (IOException ex) {
            System.err.println("Erro ao ler arquivo: " + ex.getMessage());
        }
        return false;
    }
}