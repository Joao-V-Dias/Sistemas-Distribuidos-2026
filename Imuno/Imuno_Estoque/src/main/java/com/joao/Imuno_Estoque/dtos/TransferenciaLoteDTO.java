package com.joao.Imuno_Estoque.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record TransferenciaLoteDTO(

        @NotNull(message = "O novo freezer é obrigatório")
        Long novoFreezerId,

        @NotBlank(message = "A justificativa é obrigatória")
        String justificativa

) {
}
