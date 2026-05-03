package com.sd.prj_planta_serv_gestor.services;

import org.springframework.http.HttpMethod;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class SistemasService {

    private RestTemplate restTemplate;

    private String url_serv1_plantas;
    private String url_ser1_flores;
    private String url_serv3_pmml;

    public SistemasService() {
        this.restTemplate = new RestTemplate();
        this.url_serv1_plantas = "http://localhost:8081/api/plantas";
        this.url_ser1_flores = "http://localhost:8081/api/flores";
        this.url_serv3_pmml = "http://localhost:8083/api/pmml";
    }

    public ResponseEntity<String> getPlantas() {
        ResponseEntity<String> response = restTemplate.getForEntity(url_serv1_plantas, String.class);
        return response;
    }

    public ResponseEntity<String> salvarPlanta(RequestEntity<String> planta) {
        ResponseEntity<String> response = restTemplate.postForEntity(url_serv1_plantas, planta, String.class);
        return response;
    }

    public void deletarPlanta(RequestEntity<String> planta) {
        restTemplate.exchange(url_serv1_plantas, HttpMethod.DELETE, planta, String.class);
    }


    public ResponseEntity<String> getFlores() {
        ResponseEntity<String> response = restTemplate.getForEntity(url_ser1_flores, String.class);
        return response;
    }

    public ResponseEntity<String> salvarflor(RequestEntity<String> flor) {
        ResponseEntity<String> response = restTemplate.postForEntity(url_ser1_flores, flor, String.class);
        return response;
    }

    public void deletarFlor(RequestEntity<String> flor) {
        restTemplate.exchange(url_ser1_flores, HttpMethod.DELETE, flor, String.class);
    }


    public ResponseEntity<String> classificar(ResponseEntity<String> dadosFlor) {
        ResponseEntity<String> response = restTemplate.postForEntity(url_serv3_pmml, dadosFlor, String.class);
        return response;
    }
}
