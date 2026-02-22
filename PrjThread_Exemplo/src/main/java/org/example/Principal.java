package org.example;

import org.example.Classes.ClasseContA;
import org.example.Classes.ClasseContThreadB;

public class Principal {
    static void main() {
//        new ClasseContA("Teste 1", 100).contador();
//        new ClasseContA("Teste 2", 100).contador();

//        Thread A = new ClasseContThreadB("Teste 1", 1000);
//        Thread B = new ClasseContThreadB("Teste 2", 1000);
//
//        A.start();
//        B.start();

        Thread A = new Thread(new ClasseContThreadB("Teste 1", 100));
        Thread B = new Thread(new ClasseContThreadB("Teste 2", 100));

        A.start();
        B.start();
    }
}
