package com.joao.servico_1.dtos;

import java.time.LocalDateTime;

public record VacinaDTO(
        Long id,
        String nome,
        String fabricante,
        String tipo,
        Integer dosesPorFrasco,
        String descricao,
        LocalDateTime criadoEm
) {
}