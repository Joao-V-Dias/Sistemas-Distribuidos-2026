/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.joao.prjchatservidor;

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
public class ManiplaArquivo {
    public static synchronized void escreverArq(String texto, String nomeArq, boolean manter){
        try{
            File f = new File("c:\\"+nomeArq+".txt");
            FileWriter fw = new FileWriter(f, manter);
            PrintWriter pw = new PrintWriter(fw);
            pw.println(texto);
            fw.close();
        }catch(IOException ex){
            ex.printStackTrace();
        }
    }
    
    public static synchronized BufferedReader lerArq(String nomeArq){
        BufferedReader br = null;
        try{
            File f = new File("c:\\"+nomeArq+".txt");
            if(f.exists()){
                FileReader fr = new FileReader(f);
                br = new BufferedReader(fr);
            }
        }catch(IOException ex){
            ex.printStackTrace();
        }
        return br;
    }
}
