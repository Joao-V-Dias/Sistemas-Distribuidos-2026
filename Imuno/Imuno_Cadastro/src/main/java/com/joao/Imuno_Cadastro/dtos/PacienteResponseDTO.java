package com.joao.Imuno_Cadastro.dtos;

import com.joao.Imuno_Cadastro.models.enums.Sexo;

import java.time.LocalDate;

public record PacienteResponseDTO(

        Long id,
        String nome,
        String cpf,
        int idade,
        LocalDate data_nascimento,
        String telefone,
        Sexo sexo,
        Boolean ativo

) {
}
