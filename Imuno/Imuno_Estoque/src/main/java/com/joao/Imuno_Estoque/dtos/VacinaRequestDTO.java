package com.joao.Imuno_Estoque.dtos;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record VacinaRequestDTO(

        @NotBlank(message = "O nome da vacina é obrigatório")
        @Size(max = 150, message = "O nome deve ter no máximo 150 caracteres")
        String nome,

        @NotBlank(message = "O fabricante é obrigatório")
        @Size(max = 150, message = "O fabricante deve ter no máximo 150 caracteres")
        String fabricante,

        @NotBlank(message = "O tipo da vacina é obrigatório")
        @Size(max = 100, message = "O tipo deve ter no máximo 100 caracteres")
        String tipo,

        @NotNull(message = "A quantidade de doses por frasco é obrigatória")
        @Min(value = 1, message = "Deve haver pelo menos 1 dose por frasco")
        Integer dosesPorFrasco,

        String descricao,

        @Min(value = 0, message = "O intervalo entre doses não pode ser negativo")
        Integer intervaloDosesDias

) {
}