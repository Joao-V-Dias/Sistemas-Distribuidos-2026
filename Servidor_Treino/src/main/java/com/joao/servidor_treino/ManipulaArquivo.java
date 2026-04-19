/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.joao.servidor_treino;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

/**
 *
 * @author Joao Dias
 */
public class ManipulaArquivo {

    public static synchronized void escreverArq(String texto, String nomeArq, boolean manter) {
        try (FileWriter fw = new FileWriter("c:\\" + nomeArq + ".txt", manter); PrintWriter pw = new PrintWriter(fw)) {
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

    public static synchronized boolean excluirCpf(String cpf, String nomeArq) {
        File arquivoOriginal = new File("c:\\" + nomeArq + ".txt");
        File arquivoTemp = new File("c:\\" + nomeArq + "_temp.txt");

        boolean removido = false;

        try (
                BufferedReader br = new BufferedReader(new FileReader(arquivoOriginal)); PrintWriter pw = new PrintWriter(new FileWriter(arquivoTemp))) {
            String linha;

            while ((linha = br.readLine()) != null) {
                if (!linha.trim().equals(cpf.trim())) {
                    pw.println(linha);
                } else {
                    removido = true;
                }
            }

        } catch (IOException e) {
            System.err.println("Erro ao processar arquivo: " + e.getMessage());
            return false;
        }

        if (arquivoOriginal.delete()) {
            if (arquivoTemp.renameTo(arquivoOriginal)) {
                return removido;
            }
        }

        return false;
    }
}
