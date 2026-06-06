package com.joao.Imuno_Estoque.controllers;

import com.joao.Imuno_Estoque.dtos.BaixaLoteDTO;
import com.joao.Imuno_Estoque.dtos.LoteEntradaDTO;
import com.joao.Imuno_Estoque.dtos.LoteResponseDTO;
import com.joao.Imuno_Estoque.dtos.TransferenciaLoteDTO;
import com.joao.Imuno_Estoque.services.LoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lotes")
@RequiredArgsConstructor
public class LoteController {

    @Autowired
    private LoteService loteService;

    @PostMapping
    public ResponseEntity<LoteResponseDTO> registrarEntrada(@RequestBody LoteEntradaDTO dto) {
        LoteResponseDTO response = loteService.registrarEntrada(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<LoteResponseDTO>> consultarEstoque(@RequestParam(required = false) Long freezerId, @RequestParam(required = false) Long vacinaId) {
        List<LoteResponseDTO> lotes = loteService.consultarEstoque(freezerId, vacinaId);
        return ResponseEntity.ok(lotes);
    }

    @GetMapping("/vencimento")
    public ResponseEntity<List<LoteResponseDTO>> verificarLotesVencidos() {
        List<LoteResponseDTO> lotes = loteService.verificarLotesVencidos();
        return ResponseEntity.ok(lotes);
    }

    @PutMapping("/{id}/baixa")
    public ResponseEntity<Void> processarBaixa(@PathVariable Long id, @RequestBody BaixaLoteDTO dto) {
        loteService.processarBaixa(id, dto);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/transferir")
    public ResponseEntity<Void> transferirFreezer(@PathVariable Long id, @RequestBody TransferenciaLoteDTO dto) {
        loteService.transferirFreezer(id, dto);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/bloquear")
    public ResponseEntity<Void> bloquearLote(@PathVariable Long id, @RequestParam String justificativa) {
        loteService.bloquearLote(id, justificativa);
        return ResponseEntity.noContent().build();
    }
}
