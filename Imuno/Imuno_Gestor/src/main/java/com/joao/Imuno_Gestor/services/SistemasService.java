package com.joao.Imuno_Gestor.services;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

@Service
public class SistemasService {
    private RestTemplate restTemplate;

    private String urlPacientes;
    private String urlFornecedores;
    private String urlFreezers;

    public SistemasService() {
        this.restTemplate = new RestTemplate();
        this.urlPacientes = "http://localhost:8081/api/pacientes/";
        this.urlFornecedores = "http://localhost:8081/api/fornecedores/";
        this.urlFreezers = "http://localhost:8081/api/freezers/";
    }

    //=====================
    // Servico Cadastro
    //=====================

    //----------------
    //Pacientes
    //----------------

    public ResponseEntity<String> atualizarPaciente(Long id, RequestEntity<String> paciente) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<>(paciente.getBody(), headers);
        return restTemplate.exchange(urlPacientes + "/" + id, HttpMethod.PUT, entity, String.class);
    }

    public ResponseEntity<String> buscarPacientes(){
        return restTemplate.getForEntity(this.urlPacientes + "/all", String.class);
    }

    public ResponseEntity<String> buscarPacientes(String text){
        return restTemplate.getForEntity(this.urlPacientes + "/all/" + text, String.class);
    }

    //----------------
    //Fornecedores
    //----------------

    public ResponseEntity<String> buscarFornecedores(){
        return restTemplate.getForEntity(this.urlFornecedores + "/all", String.class);
    }

    public ResponseEntity<String> buscarFornecedores(String text){
        return restTemplate.getForEntity(this.urlFornecedores + "/all/" + text, String.class);
    }

    //----------------
    //Freezers
    //----------------

    public ResponseEntity<String> buscarFreezers(){
        return restTemplate.getForEntity(this.urlFreezers + "/all", String.class);
    }

    public ResponseEntity<String> buscarFreezers(String text){
        return restTemplate.getForEntity(this.urlFreezers + "/all/" + text, String.class);
    }
}
