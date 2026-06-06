package com.joao.Imuno_Cadastro.dtos;

import com.joao.Imuno_Cadastro.models.enums.Perfil;

import java.time.LocalDateTime;

public record UsuarioResponseDTO(

        Long id,
        String nome,
        String email,
        Perfil perfil,
        Boolean ativo,
        LocalDateTime criadoEm,
        LocalDateTime ultimoLogin

) {
}