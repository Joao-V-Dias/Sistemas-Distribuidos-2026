package com.joao.Imuno_Cadastro.services;

import com.joao.Imuno_Cadastro.dtos.PacienteRequestDTO;
import com.joao.Imuno_Cadastro.dtos.PacienteResponseDTO;

import java.util.List;

public interface PacienteService {

    PacienteResponseDTO cadastrar(PacienteRequestDTO dto);
    List<PacienteResponseDTO> listarAtivos();
    PacienteResponseDTO buscarPorId(Long id);
    PacienteResponseDTO atualizar(Long id, PacienteRequestDTO dto);
    void inativar(Long id);
}
