package joao;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.net.Socket;
import java.net.UnknownHostException;

public class ClienteConexao extends Thread{

    private static boolean done = false;
    private Socket conexao;
    
    public ClienteConexao() {
    }

    public ClienteConexao(Socket conexao) {
        this.conexao = conexao;
    }
    
    public static void init(String servidor, int porta, String meuNome){
        try{
            Socket con = new Socket(servidor, porta);

            PrintStream saida = new PrintStream(con.getOutputStream());
            BufferedReader teclado = new BufferedReader(new InputStreamReader(System.in));
            saida.println(meuNome);

            Thread t = new Thread(new ClienteConexao(con));
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
    
    @Override
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
