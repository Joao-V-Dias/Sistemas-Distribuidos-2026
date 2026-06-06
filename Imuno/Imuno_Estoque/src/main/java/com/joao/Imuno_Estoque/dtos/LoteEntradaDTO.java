package com.joao.Imuno_Estoque.dtos;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record LoteEntradaDTO(

        @NotNull(message = "A vacina é obrigatória")
        Long vacinaId,

        @NotNull(message = "O fornecedor é obrigatório")
        Long fornecedorId,

        @NotNull(message = "O freezer é obrigatório")
        Long freezerId,

        @NotBlank(message = "O número do lote é obrigatório")
        String numeroLote,

        @NotNull(message = "A data de validade é obrigatória")
        @Future(message = "A validade deve ser futura")
        LocalDate dataValidade,

        @NotNull(message = "A quantidade inicial é obrigatória")
        @Min(value = 1, message = "A quantidade deve ser maior que zero")
        Integer quantidadeInicial

) {
}
