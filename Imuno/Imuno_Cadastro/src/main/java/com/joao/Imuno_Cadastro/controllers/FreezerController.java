package com.joao.Imuno_Cadastro.controllers;

import com.joao.Imuno_Cadastro.dtos.FreezerRequestDTO;
import com.joao.Imuno_Cadastro.dtos.FreezerResponseDTO;
import com.joao.Imuno_Cadastro.dtos.FreezerStatusDTO;
import com.joao.Imuno_Cadastro.services.FreezerService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/freezers")
public class FreezerController {

    @Autowired
    private FreezerService freezerService;

    @Operation(summary = "Cadastrar freezer")
    @PostMapping
    public ResponseEntity<FreezerResponseDTO> cadastrar(@RequestBody FreezerRequestDTO dto) {
        FreezerResponseDTO response = freezerService.cadastrar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @Operation(summary = "Buscar freezers")
    @GetMapping("/all")
    public ResponseEntity<List<FreezerResponseDTO>> buscarFreezers() {
        List<FreezerResponseDTO> freezers = freezerService.buscarFreezers();
        return ResponseEntity.ok(freezers);
    }

    @Operation(summary = "Buscar freezers por serial")
    @GetMapping("/all/{serial}")
    public ResponseEntity<List<FreezerResponseDTO>> buscarFreezers(@PathVariable String serial) {
        List<FreezerResponseDTO> freezers = freezerService.buscarFreezers(serial);
        return ResponseEntity.ok(freezers);
    }

    @Operation(summary = "Buscar freezer por ID")
    @GetMapping("/{id}")
    public ResponseEntity<FreezerResponseDTO> buscarPorId(@PathVariable Long id) {
        FreezerResponseDTO freezer = freezerService.buscarPorId(id);
        return ResponseEntity.ok(freezer);
    }

    @Operation(summary = "Atualizar limites de temperatura")
    @PatchMapping("/{id}/limites")
    public ResponseEntity<FreezerResponseDTO> atualizarLimites(@PathVariable Long id, @RequestParam BigDecimal min, @RequestParam BigDecimal max) {
        FreezerResponseDTO response = freezerService.atualizarLimites(id, min, max);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Alterar status do freezer")
    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> alterarStatus(@PathVariable Long id, @RequestBody FreezerStatusDTO dto) {
        freezerService.alterarStatus(id, dto);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Verificar operacionalidade")
    @GetMapping("/{id}/operacional")
    public ResponseEntity<Boolean> verificarOperacionalidade(@PathVariable Long id) {
        boolean operacional = freezerService.verificarOperacionalidade(id);
        return ResponseEntity.ok(operacional);
    }
}
