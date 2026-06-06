package com.joao.Imuno_Cadastro.dtos;

import com.joao.Imuno_Cadastro.models.enums.StatusFreezer;
import jakarta.validation.constraints.NotNull;

public record FreezerStatusDTO(

        @NotNull(message = "O status é obrigatório")
        StatusFreezer status,

        String justificativa

) {
}
