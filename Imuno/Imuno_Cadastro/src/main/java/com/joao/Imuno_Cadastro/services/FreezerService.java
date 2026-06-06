package com.joao.Imuno_Cadastro.services;

import com.joao.Imuno_Cadastro.dtos.FreezerRequestDTO;
import com.joao.Imuno_Cadastro.dtos.FreezerResponseDTO;
import com.joao.Imuno_Cadastro.dtos.FreezerStatusDTO;
import com.joao.Imuno_Cadastro.models.enums.StatusFreezer;

import java.math.BigDecimal;
import java.util.List;

public interface FreezerService {

    FreezerResponseDTO cadastrar(FreezerRequestDTO dto);
    List<FreezerResponseDTO> listar(StatusFreezer status);
    FreezerResponseDTO buscarPorId(Long id);
    FreezerResponseDTO atualizarLimites(Long id, BigDecimal min, BigDecimal max);
    void alterarStatus(Long id, FreezerStatusDTO dto);
    boolean verificarOperacionalidade(Long id);
}
