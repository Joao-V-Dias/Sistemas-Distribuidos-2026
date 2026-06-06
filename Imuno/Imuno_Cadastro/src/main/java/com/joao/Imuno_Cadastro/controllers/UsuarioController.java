package com.joao.Imuno_Cadastro.controllers;

import com.joao.Imuno_Cadastro.dtos.UsuarioRequestDTO;
import com.joao.Imuno_Cadastro.dtos.UsuarioResponseDTO;
import com.joao.Imuno_Cadastro.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UsuarioResponseDTO cadastrar(
            @RequestBody
            UsuarioRequestDTO dto) {

        return service.cadastrar(dto);
    }

    @GetMapping
    public List<UsuarioResponseDTO> listarTodos() {

        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public UsuarioResponseDTO buscarPorId(
            @PathVariable
            Long id) {

        return service.buscarPorId(id);
    }

    @GetMapping("/email/{email}")
    public UsuarioResponseDTO buscarPorEmail(
            @PathVariable
            String email) {

        return service.buscarPorEmail(email);
    }

    @PutMapping("/{id}")
    public UsuarioResponseDTO atualizar(
            @PathVariable
            Long id,
            @RequestBody
            UsuarioRequestDTO dto) {

        return service.atualizar(id, dto);
    }

    @PatchMapping("/{id}/status")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void alterarStatus(
            @PathVariable
            Long id,
            @RequestParam
            Boolean ativo) {

        service.alterarStatus(id, ativo);
    }
}
