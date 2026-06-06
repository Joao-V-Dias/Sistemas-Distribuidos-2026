package com.joao.Imuno_Estoque.dtos;


public record LoteResponseDTO(

        Long id,
        String vacina,
        String numeroLote,
        String validade,
        Integer quantidadeAtual,
        String status,
        Long freezerId

) {
}
