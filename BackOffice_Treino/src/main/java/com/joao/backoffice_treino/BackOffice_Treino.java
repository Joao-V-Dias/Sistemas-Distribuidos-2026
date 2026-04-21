/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.joao.backoffice_treino;

/**
 *
 * @author Joao Dias
 */
public class BackOffice_Treino {

    public static void main(String[] args) {
        //Para rodar na thread da view correta sem travar
        //javax.swing.SwingUtilities.invokeLater
        java.awt.EventQueue.invokeLater(() -> new View().setVisible(true));
    }
}
