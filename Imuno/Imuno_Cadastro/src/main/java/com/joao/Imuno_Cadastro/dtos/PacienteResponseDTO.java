package com.joao.Imuno_Cadastro.dtos;

import com.joao.Imuno_Cadastro.models.enums.Sexo;

import java.time.LocalDate;

public record PacienteResponseDTO(

        Long id,
        String nome,
        String cpf,
        LocalDate dataNascimento,
        Sexo sexo,
        Boolean ativo

) {
}
