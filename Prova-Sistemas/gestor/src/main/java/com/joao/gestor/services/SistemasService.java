package com.joao.gestor.services;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;
import tools.jackson.databind.node.ArrayNode;
import tools.jackson.databind.node.ObjectNode;

@Service
public class SistemasService {

    private RestTemplate restTemplate;

    // SERVIÇO JAVA
    private String urlVacinas;
    private String urlLotes;

    // SERVIÇO PYTHON
    private String urlFornecedores;

    public SistemasService() {
        this.restTemplate = new RestTemplate();
        this.urlVacinas = "http://localhost:8081/vacinas";
        this.urlLotes = "http://localhost:8081/lotes";
        this.urlFornecedores = "http://localhost:8000/api/fornecedores";
    }

    // ==========================
    // VACINAS
    // ==========================

    public ResponseEntity<String> getVacinas() {
        return restTemplate.getForEntity(urlVacinas, String.class);
    }

    public ResponseEntity<String> getVacinaById(Long id) {
        return restTemplate.getForEntity(urlVacinas + "/" + id, String.class);
    }

    public ResponseEntity<String> salvarVacina(RequestEntity<String> vacina) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<>(vacina.getBody(), headers);
        return restTemplate.exchange(urlVacinas, HttpMethod.POST, entity, String.class);
    }

    public ResponseEntity<String> atualizarVacina(Long id, RequestEntity<String> vacina) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<>(vacina.getBody(), headers);
        return restTemplate.exchange(urlVacinas + "/" + id, HttpMethod.PUT, entity, String.class);
    }

    public void deletarVacina(Long id) {
        restTemplate.exchange(urlVacinas + "/" + id, HttpMethod.DELETE, null, String.class);
    }


    // ==========================
    // LOTES
    // ==========================

    public ResponseEntity<String> getLotes() {
        return restTemplate.getForEntity(urlLotes, String.class);
    }

    public ResponseEntity<String> getLoteById(Long id) {
        return restTemplate.getForEntity(urlLotes + "/" + id, String.class);
    }

    public ResponseEntity<String> salvarLote(RequestEntity<String> lote) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<>(lote.getBody(), headers);
        return restTemplate.exchange(urlLotes, HttpMethod.POST, entity, String.class);
    }

    public ResponseEntity<String> atualizarLote(Long id, RequestEntity<String> lote) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<>(lote.getBody(), headers);
        return restTemplate.exchange(urlLotes + "/" + id, HttpMethod.PUT, entity, String.class);
    }

    public void deletarLote(Long id) {
        restTemplate.exchange(urlLotes + "/" + id, HttpMethod.DELETE, null, String.class);
    }


    // ==========================
    // FORNECEDORES (PYTHON)
    // ==========================

    public ResponseEntity<String> getFornecedores() {
        return restTemplate.getForEntity(urlFornecedores + "/", String.class);
    }

    public ResponseEntity<String> getFornecedorById(String id) {
        return restTemplate.getForEntity(urlFornecedores + "/" + id, String.class);
    }

    public ResponseEntity<String> salvarFornecedor(RequestEntity<String> fornecedor) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<>(fornecedor.getBody(), headers);
        return restTemplate.exchange(urlFornecedores + "/create", HttpMethod.POST, entity, String.class);
    }

    public ResponseEntity<String> atualizarFornecedor(String id, RequestEntity<String> fornecedor) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<>(fornecedor.getBody(), headers);
        return restTemplate.exchange(urlFornecedores + "/update/" + id, HttpMethod.PUT, entity, String.class);
    }

    public void deletarFornecedor(String id) {
        restTemplate.exchange(urlFornecedores + "/delete/" + id, HttpMethod.DELETE, null, String.class);
    }


    // =========================================
    // CONSULTAS ENTRE BANCOS
    // =========================================

    public ResponseEntity<String> getLotesComVacina() {
        try {
            ObjectMapper mapper = new ObjectMapper();
            // Buscar todos os lotes
            ResponseEntity<String> responseLotes = restTemplate.getForEntity(urlLotes, String.class);
            ArrayNode lotes = (ArrayNode) mapper.readTree(responseLotes.getBody());
            // Percorrer lotes
            for (JsonNode lote : lotes) {
                Long vacinaId = lote.get("vacinaId").asLong();
                // Buscar vacina
                ResponseEntity<String> responseVacina = restTemplate.getForEntity(urlVacinas + "/" + vacinaId, String.class);
                JsonNode vacina = mapper.readTree(responseVacina.getBody());
                // Adicionar vacina no lote
                ((ObjectNode) lote).set("vacina", vacina);
            }
            return ResponseEntity.ok(lotes.toPrettyString());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    public ResponseEntity<String> getLotesComFornecedor() {

        try {

            ObjectMapper mapper = new ObjectMapper();

            ResponseEntity<String> responseLotes = restTemplate.getForEntity(urlLotes, String.class);

            ArrayNode lotes = (ArrayNode) mapper.readTree(responseLotes.getBody());

            for (JsonNode lote : lotes) {

                String fornecedorId = lote.get("fornecedorId").asText();

                ResponseEntity<String> responseFornecedor = restTemplate.getForEntity(urlFornecedores + "/" + fornecedorId, String.class);

                JsonNode fornecedor = mapper.readTree(responseFornecedor.getBody());

                ((ObjectNode) lote).set("fornecedor", fornecedor);
            }

            return ResponseEntity.ok(lotes.toPrettyString());

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}