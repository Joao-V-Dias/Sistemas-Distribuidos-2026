package joao;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.net.Socket;
import java.net.UnknownHostException;

public class Cliente_Principal extends Thread {

    private static boolean done = false;
    private Socket conexao;

    static void main() {
        try{
            Socket con = new Socket("127.0.0.1", 2222);

            PrintStream saida = new PrintStream(con.getOutputStream());
            BufferedReader teclado = new BufferedReader(new InputStreamReader(System.in));
            System.out.print("Digite seu nome: ");
            String meuNome = teclado.readLine();
            saida.println(meuNome);

            Thread t = new Thread(new Cliente_Principal(con));
            t.start();

            String linha;
            while (!done) {
                System.out.print(">> ");
                linha = teclado.readLine();

                if (done) {
                    break;
                }

                saida.println(linha);
            }
        } catch (UnknownHostException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }

    public Cliente_Principal(Socket conexao) {
        this.conexao = conexao;
    }

    public void run(){
        try{
            BufferedReader entrada = new BufferedReader(new InputStreamReader(conexao.getInputStream()));
            String linha;
            while(true){
                linha = entrada.readLine();

                if(linha == null){
                    System.out.println("Conexao encerrada");
                    break;
                }
                System.out.println();
                System.out.println(linha);
                System.out.println("...>");
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        done = true;
    }
}
