package com.joao.Imuno_Cadastro.dtos;

public record FornecedorResponseDTO(
        Long id,
        String razaoSocial,
        String cnpj,
        Boolean ativo

) {
}
