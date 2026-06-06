package com.joao.servico_1.controllers;

import com.joao.servico_1.dtos.VacinaDTO;
import com.joao.servico_1.services.VacinaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vacinas")
@CrossOrigin("*")
public class VacinaController {

    @Autowired
    private VacinaService service;

    @GetMapping
    public List<VacinaDTO> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public VacinaDTO buscarPorId(
            @PathVariable
            Long id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    public VacinaDTO salvar(
            @RequestBody
            VacinaDTO dto) {
        return service.salvar(dto);
    }

    @PutMapping("/{id}")
    public VacinaDTO atualizar(
            @PathVariable
            Long id,
            @RequestBody
            VacinaDTO dto) {
        return service.atualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deletar(
            @PathVariable
            Long id) {
        service.deletar(id);
    }
}
