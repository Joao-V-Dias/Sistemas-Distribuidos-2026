package com.joao.servico_1.dtos;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record LoteDTO(
        Long id,
        Long vacinaId,
        String fornecedorId,
        String numeroLote,
        LocalDate dataValidade,
        Integer quantidadeInicial,
        Integer quantidadeAtual,
        String status,
        String justificativa,
        LocalDateTime criadoEm,
        LocalDateTime atualizadoEm
) {
}
