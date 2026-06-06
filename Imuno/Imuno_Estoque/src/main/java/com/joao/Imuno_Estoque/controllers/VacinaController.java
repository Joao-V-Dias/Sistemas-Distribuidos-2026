package com.joao.Imuno_Estoque.controllers;

import com.joao.Imuno_Estoque.dtos.VacinaRequestDTO;
import com.joao.Imuno_Estoque.dtos.VacinaResponseDTO;
import com.joao.Imuno_Estoque.services.VacinaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vacinas")
@RequiredArgsConstructor
public class VacinaController {

    private final VacinaService vacinaService;

    @PostMapping
    public ResponseEntity<VacinaResponseDTO> cadastrar(@RequestBody VacinaRequestDTO dto) {
        VacinaResponseDTO response = vacinaService.cadastrar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<VacinaResponseDTO>> listar() {
        List<VacinaResponseDTO> vacinas = vacinaService.listarAtivas();
        return ResponseEntity.ok(vacinas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VacinaResponseDTO> buscarPorId(@PathVariable Long id) {
        VacinaResponseDTO vacina = vacinaService.buscarPorId(id);
        return ResponseEntity.ok(vacina);
    }

    @PutMapping("/{id}")
    public ResponseEntity<VacinaResponseDTO> atualizar(@PathVariable Long id, @RequestBody VacinaRequestDTO dto) {
        VacinaResponseDTO response = vacinaService.atualizar(id, dto);
        return ResponseEntity.ok(response);
    }
}
