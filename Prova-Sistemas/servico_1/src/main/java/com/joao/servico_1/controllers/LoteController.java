package com.joao.servico_1.controllers;


import com.joao.servico_1.dtos.LoteDTO;
import com.joao.servico_1.services.LoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/lotes")
@CrossOrigin("*")
public class LoteController {

    @Autowired
    private LoteService service;

    @GetMapping
    public List<LoteDTO> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public LoteDTO buscarPorId(
            @PathVariable
            Long id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    public LoteDTO salvar(
            @RequestBody
            LoteDTO dto) {
        return service.salvar(dto);
    }

    @PutMapping("/{id}")
    public LoteDTO atualizar(
            @PathVariable
            Long id,
            @RequestBody
            LoteDTO dto) {
        return service.atualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deletar(
            @PathVariable
            Long id) {
        service.deletar(id);
    }
}
