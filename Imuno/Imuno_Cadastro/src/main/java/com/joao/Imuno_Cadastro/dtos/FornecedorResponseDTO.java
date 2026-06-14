package com.joao.Imuno_Cadastro.dtos;

public record FornecedorResponseDTO(
        Long id,
        String razaoSocial,
        String cnpj,
        String telefone,
        String email,
        Boolean ativo
) {
}
