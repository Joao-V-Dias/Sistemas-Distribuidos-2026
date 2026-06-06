package com.joao.gestor.controllers;

import com.joao.gestor.services.SistemasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sistemas")
@CrossOrigin("*")
public class SistemasController {

    @Autowired
    private SistemasService sistemasService;

    // ==========================
    // VACINAS
    // ==========================

    @GetMapping("/vacinas")
    public ResponseEntity<String> getVacinas() {
        return sistemasService.getVacinas();
    }

    @GetMapping("/vacinas/{id}")
    public ResponseEntity<String> getVacinaById(
            @PathVariable
            Long id) {
        return sistemasService.getVacinaById(id);
    }

    @PostMapping("/vacinas")
    public ResponseEntity<String> salvarVacina(
            @RequestBody
            String vacina) {

        RequestEntity<String> request = RequestEntity.post("").body(vacina);

        return sistemasService.salvarVacina(request);
    }

    @PutMapping("/vacinas/{id}")
    public ResponseEntity<String> atualizarVacina(
            @PathVariable
            Long id,
            @RequestBody
            String vacina) {

        RequestEntity<String> request = RequestEntity.put("").body(vacina);

        return sistemasService.atualizarVacina(id, request);
    }

    @DeleteMapping("/vacinas/{id}")
    public void deletarVacina(
            @PathVariable
            Long id) {
        sistemasService.deletarVacina(id);
    }


    // ==========================
    // LOTES
    // ==========================

    @GetMapping("/lotes")
    public ResponseEntity<String> getLotes() {
        return sistemasService.getLotes();
    }

    @GetMapping("/lotes/{id}")
    public ResponseEntity<String> getLoteById(
            @PathVariable
            Long id) {
        return sistemasService.getLoteById(id);
    }

    @PostMapping("/lotes")
    public ResponseEntity<String> salvarLote(
            @RequestBody
            String lote) {

        RequestEntity<String> request = RequestEntity.post("").body(lote);

        return sistemasService.salvarLote(request);
    }

    @PutMapping("/lotes/{id}")
    public ResponseEntity<String> atualizarLote(
            @PathVariable
            Long id,
            @RequestBody
            String lote) {

        RequestEntity<String> request = RequestEntity.put("").body(lote);

        return sistemasService.atualizarLote(id, request);
    }

    @DeleteMapping("/lotes/{id}")
    public void deletarLote(
            @PathVariable
            Long id) {
        sistemasService.deletarLote(id);
    }


    // ==========================
    // FORNECEDORES
    // ==========================

    @GetMapping("/fornecedores")
    public ResponseEntity<String> getFornecedores() {
        return sistemasService.getFornecedores();
    }

    @GetMapping("/fornecedores/{id}")
    public ResponseEntity<String> getFornecedorById(
            @PathVariable
            String id) {
        return sistemasService.getFornecedorById(id);
    }

    @PostMapping("/fornecedores")
    public ResponseEntity<String> salvarFornecedor(
            @RequestBody
            String fornecedor) {

        RequestEntity<String> request = RequestEntity.post("").body(fornecedor);

        return sistemasService.salvarFornecedor(request);
    }

    @PutMapping("/fornecedores/{id}")
    public ResponseEntity<String> atualizarFornecedor(
            @PathVariable
            String id,
            @RequestBody
            String fornecedor) {

        RequestEntity<String> request = RequestEntity.put("").body(fornecedor);

        return sistemasService.atualizarFornecedor(id, request);
    }

    @DeleteMapping("/fornecedores/{id}")
    public void deletarFornecedor(
            @PathVariable
            String id) {
        sistemasService.deletarFornecedor(id);
    }


    // ==========================
    // CONSULTAS
    // ==========================

    @GetMapping("/lotes-vacinas")
    public ResponseEntity<String> getLotesComVacinas() {

        return sistemasService.getLotesComVacina();
    }

    @GetMapping("/lotes-fornecedores")
    public ResponseEntity<String> getLotesComFornecedor() {

        return sistemasService.getLotesComFornecedor();
    }


}
