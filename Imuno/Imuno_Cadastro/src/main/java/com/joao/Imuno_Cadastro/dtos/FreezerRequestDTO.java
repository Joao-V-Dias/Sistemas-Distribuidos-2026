package com.joao.Imuno_Cadastro.dtos;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record FreezerRequestDTO(

        @NotBlank(message = "O número de série é obrigatório")
        @Size(max = 100, message = "O número de série deve ter no máximo 100 caracteres")
        String numeroSerie,

        @NotBlank(message = "O modelo é obrigatório")
        @Size(max = 100, message = "O modelo deve ter no máximo 100 caracteres")
        String modelo,

        @Size(max = 200, message = "A localização deve ter no máximo 200 caracteres") String localizacao,

        @NotNull(message = "A temperatura mínima segura é obrigatória")
        @DecimalMin(value = "-273.15", message = "Temperatura mínima inválida")
        BigDecimal tempMinSegura,

        @NotNull(message = "A temperatura máxima segura é obrigatória")
        @DecimalMin(value = "-273.15", message = "Temperatura máxima inválida")
        BigDecimal tempMaxSegura

) {
}
