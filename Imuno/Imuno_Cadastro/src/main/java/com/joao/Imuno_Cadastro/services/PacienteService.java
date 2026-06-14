package com.joao.Imuno_Cadastro.services;

import com.joao.Imuno_Cadastro.dtos.PacienteRequestDTO;
import com.joao.Imuno_Cadastro.dtos.PacienteResponseDTO;

import java.util.List;

public interface PacienteService {

    PacienteResponseDTO cadastrar(PacienteRequestDTO dto);
    List<PacienteResponseDTO> buscarPorNomeCpf(String text);
    PacienteResponseDTO buscarPorId(Long id);
    List<PacienteResponseDTO>  getPacientes();
    PacienteResponseDTO atualizar(Long id, PacienteRequestDTO dto);
    void inativar(Long id);
}
