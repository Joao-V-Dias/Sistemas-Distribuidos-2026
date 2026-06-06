package com.joao.Imuno_Cadastro.controllers;

import com.joao.Imuno_Cadastro.dtos.FornecedorRequestDTO;
import com.joao.Imuno_Cadastro.dtos.FornecedorResponseDTO;
import com.joao.Imuno_Cadastro.services.FornecedorService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fornecedores")
public class FornecedorController {

    @Autowired
    private FornecedorService fornecedorService;

    @Operation(summary = "Cadastrar fornecedor")
    @PostMapping
    public ResponseEntity<FornecedorResponseDTO> cadastrar(@RequestBody FornecedorRequestDTO dto) {
        FornecedorResponseDTO response = fornecedorService.cadastrar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @Operation(summary = "Listar fornecedores ativos")
    @GetMapping
    public ResponseEntity<List<FornecedorResponseDTO>> listarAtivos() {
        List<FornecedorResponseDTO> fornecedores = fornecedorService.listarAtivos();
        return ResponseEntity.ok(fornecedores);
    }

    @Operation(summary = "Buscar fornecedor por ID")
    @GetMapping("/{id}")
    public ResponseEntity<FornecedorResponseDTO> buscarPorId(@PathVariable Long id) {
        FornecedorResponseDTO fornecedor = fornecedorService.buscarPorId(id);
        return ResponseEntity.ok(fornecedor);
    }

    @Operation(summary = "Atualizar fornecedor")
    @PutMapping("/{id}")
    public ResponseEntity<FornecedorResponseDTO> atualizar(@PathVariable Long id, @RequestBody FornecedorRequestDTO dto) {
        FornecedorResponseDTO response = fornecedorService.atualizar(id, dto);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Inativar fornecedor")
    @PatchMapping("/{id}/ativo")
    public ResponseEntity<Void> inativar(@PathVariable Long id) {
        fornecedorService.inativar(id);
        return ResponseEntity.noContent().build();
    }
}
