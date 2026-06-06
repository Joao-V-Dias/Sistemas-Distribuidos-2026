package com.joao.Imuno_Estoque.dtos;

public record VacinaResponseDTO(

        Long id,
        String nome,
        String fabricante,
        String tipo,
        Integer dosesPorFrasco


) {
}
