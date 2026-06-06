package com.joao.Imuno_Cadastro.dtos;

import com.joao.Imuno_Cadastro.models.enums.Perfil;

public record UsuarioRequestDTO(

        String nome,
        String email,
        String senhaHash,
        Perfil perfil

) {
}
