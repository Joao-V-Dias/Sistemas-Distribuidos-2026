package com.joao.Imuno_Cadastro.controllers;

import com.joao.Imuno_Cadastro.dtos.PacienteRequestDTO;
import com.joao.Imuno_Cadastro.dtos.PacienteResponseDTO;
import com.joao.Imuno_Cadastro.services.PacienteService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pacientes")
public class PacienteController {

    @Autowired
    private PacienteService pacienteService;

    @Operation(summary = "Cadastrar paciente")
    @PostMapping
    public ResponseEntity<PacienteResponseDTO> cadastrar(@RequestBody PacienteRequestDTO dto) {
        PacienteResponseDTO response = pacienteService.cadastrar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @Operation(summary = "Listar pacientes ativos")
    @GetMapping
    public ResponseEntity<List<PacienteResponseDTO>> listarAtivos() {
        List<PacienteResponseDTO> pacientes = pacienteService.listarAtivos();
        return ResponseEntity.ok(pacientes);
    }

    @Operation(summary = "Buscar paciente por ID")
    @GetMapping("/{id}")
    public ResponseEntity<PacienteResponseDTO> buscarPorId(@PathVariable Long id) {
        PacienteResponseDTO paciente = pacienteService.buscarPorId(id);
        return ResponseEntity.ok(paciente);
    }

    @Operation(summary = "Atualizar paciente")
    @PutMapping("/{id}")
    public ResponseEntity<PacienteResponseDTO> atualizar(@PathVariable Long id, @RequestBody PacienteRequestDTO dto) {
        PacienteResponseDTO response = pacienteService.atualizar(id, dto);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Inativar paciente")
    @PatchMapping("/{id}/ativo")
    public ResponseEntity<Void> inativar(@PathVariable Long id) {
        pacienteService.inativar(id);
        return ResponseEntity.noContent().build();
    }
}
