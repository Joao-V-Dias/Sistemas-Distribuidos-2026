package joao;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.net.Socket;
import javax.swing.JOptionPane;

public class ClienteConexao extends Thread{

    private static Socket con;
    private static PrintStream saida;
    private static boolean conectado = false;

    public ClienteConexao() {
    }

    public ClienteConexao(Socket con) {
        this.con = con;
    }
    
    public static void init(String servidor, int porta, String meuNome) {
        new Thread(() -> {
            try {
                con = new Socket(servidor, porta);
                saida = new PrintStream(con.getOutputStream());

                saida.println(meuNome);

                Thread t = new Thread(new ClienteConexao(con));
                t.start();

                conectado = true;
            } catch (IOException e) {
                JOptionPane.showMessageDialog(null, "Erro ao conectar!");
            }
        }).start();
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
