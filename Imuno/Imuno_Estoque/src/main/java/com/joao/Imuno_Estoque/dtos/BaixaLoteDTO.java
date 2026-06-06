package com.joao.Imuno_Estoque.dtos;

import com.joao.Imuno_Estoque.models.enums.TipoBaixa;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record BaixaLoteDTO(

        @NotNull(message = "Quantidade é obrigatória")
        @Min(value = 1, message = "A quantidade deve ser maior que zero")
        Integer quantidadeDoses,

        @NotBlank(message = "A justificativa é obrigatória")
        String justificativa,

        @NotNull(message = "Tipo da baixa é obrigatório")
        TipoBaixa tipoBaixa

) {
}
