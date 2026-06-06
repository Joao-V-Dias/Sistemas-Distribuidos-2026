package com.joao.Imuno_Estoque.services;

import com.joao.Imuno_Estoque.dtos.VacinaRequestDTO;
import com.joao.Imuno_Estoque.dtos.VacinaResponseDTO;

import java.util.List;

public interface VacinaService {
    VacinaResponseDTO cadastrar(VacinaRequestDTO dto);
    List<VacinaResponseDTO> listarAtivas();
    VacinaResponseDTO buscarPorId(Long id);
    VacinaResponseDTO atualizar(Long id, VacinaRequestDTO dto);
}
