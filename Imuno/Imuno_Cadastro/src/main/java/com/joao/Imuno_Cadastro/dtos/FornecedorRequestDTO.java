package com.joao.Imuno_Cadastro.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record FornecedorRequestDTO(

        @NotBlank(message = "A razão social é obrigatória")
        @Size(max = 200, message = "A razão social deve ter no máximo 200 caracteres")
        String razaoSocial,

        @NotBlank(message = "O nome fantasia é obrigatório")
        @Size(max = 150, message = "O nome fantasia deve ter no máximo 150 caracteres")
        String nomeFantasia,

        @NotBlank(message = "O CNPJ é obrigatório")
        @Size(max = 18, message = "O CNPJ deve ter no máximo 18 caracteres")
        String cnpj,

        @Size(max = 20, message = "O telefone deve ter no máximo 20 caracteres")
        String telefone,

        @Email(message = "E-mail inválido")
        @Size(max = 150, message = "O e-mail deve ter no máximo 150 caracteres")
        String email,

        @Size(max = 300, message = "O endereço deve ter no máximo 300 caracteres")
        String endereco,

        @Size(max = 100, message = "A cidade deve ter no máximo 100 caracteres")
        String cidade,

        @Pattern(regexp = "^[A-Z]{2}$", message = "O estado deve conter a sigla UF com 2 letras maiúsculas")
        String estado

) {
}
