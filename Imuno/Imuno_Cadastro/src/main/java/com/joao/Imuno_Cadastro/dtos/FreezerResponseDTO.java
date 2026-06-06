package com.joao.Imuno_Cadastro.dtos;

import com.joao.Imuno_Cadastro.models.enums.StatusFreezer;

import java.math.BigDecimal;

public record FreezerResponseDTO(

        Long id,
        String numeroSerie,
        String modelo,
        String localizacao,
        StatusFreezer status,
        BigDecimal tempMinSegura,
        BigDecimal tempMaxSegura

) {
}
