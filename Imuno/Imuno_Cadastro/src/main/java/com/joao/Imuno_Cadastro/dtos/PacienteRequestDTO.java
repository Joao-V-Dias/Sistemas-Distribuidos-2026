package com.joao.Imuno_Cadastro.dtos;

import com.joao.Imuno_Cadastro.models.enums.Sexo;
import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record PacienteRequestDTO(

        @NotBlank(message = "O nome é obrigatório") @Size(max = 250, message = "O nome deve ter no máximo 250 caracteres")
        String nome,

        @NotBlank(message = "O CPF é obrigatório") @Pattern(regexp = "^\\d{11}$", message = "O CPF deve conter exatamente 11 números")
        String cpf,

        @NotNull(message = "A data de nascimento é obrigatória") @Past(message = "A data de nascimento deve ser no passado")
        LocalDate dataNascimento,

        Sexo sexo,

        @Pattern(regexp = "^\\d{10,11}$", message = "O telefone deve conter 10 ou 11 números")
        String telefone,

        String observacoes

) {
}
