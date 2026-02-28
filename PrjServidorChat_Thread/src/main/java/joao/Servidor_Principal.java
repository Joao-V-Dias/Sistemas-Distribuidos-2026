package joao;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Enumeration;
import java.util.Vector;

public class Servidor_Principal extends Thread {

    private static Vector clientes;
    private Socket conexao;
    private String meuNome;

    static void main() {
        clientes = new Vector();

        try{
            ServerSocket server = new ServerSocket(2222);

            while(true){
                System.out.printf("Esperando um cliente se conectar\n");
                Socket cliente = server.accept();
                System.out.println("Conexao realizada com sucesso");

                Thread t = new Servidor_Principal(cliente);
                t.start();
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public Servidor_Principal(Socket conexao) {
        this.conexao = conexao;
    }

    public void run(){
        try{
            BufferedReader entrada = new BufferedReader(new InputStreamReader(conexao.getInputStream()));
            PrintStream saida = new PrintStream(conexao.getOutputStream());

            meuNome = entrada.readLine();

            if(meuNome == null){
                return;
            }

            clientes.add(saida);

            String linha = entrada.readLine();

            while(linha != null && !(linha.trim()).isEmpty()){
                enviarParaTodos(saida, " falou: ", linha);
                linha = entrada.readLine();
            }

            enviarParaTodos(saida, " saiu", " do chat ");
            clientes.remove(saida);
            conexao.close();

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public void enviarParaTodos(PrintStream saida, String acao, String linha){
        Enumeration e = clientes.elements();

        while(e.hasMoreElements()){
            PrintStream chat = (PrintStream) e.nextElement();
            if(chat != saida){
                chat.println(meuNome+acao+linha);
            }
        }
    }
}
