package com.joao.Imuno_Cadastro.services;

import com.joao.Imuno_Cadastro.dtos.UsuarioRequestDTO;
import com.joao.Imuno_Cadastro.dtos.UsuarioResponseDTO;

import java.util.List;

public interface UsuarioService {

    UsuarioResponseDTO cadastrar(UsuarioRequestDTO dto);
    UsuarioResponseDTO buscarPorId(Long id);
    UsuarioResponseDTO buscarPorEmail(String email);
    List<UsuarioResponseDTO> listarTodos();
    UsuarioResponseDTO atualizar(Long id, UsuarioRequestDTO dto);
    void alterarStatus(Long id, Boolean ativo);
}
