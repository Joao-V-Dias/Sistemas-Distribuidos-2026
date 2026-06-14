package com.joao.Imuno_Cadastro.services;

import com.joao.Imuno_Cadastro.dtos.FreezerRequestDTO;
import com.joao.Imuno_Cadastro.dtos.FreezerResponseDTO;
import com.joao.Imuno_Cadastro.dtos.FreezerStatusDTO;

import java.math.BigDecimal;
import java.util.List;

public interface FreezerService {

    FreezerResponseDTO cadastrar(FreezerRequestDTO dto);
    List<FreezerResponseDTO> buscarFreezers();
    List<FreezerResponseDTO> buscarFreezers(String serial);
    FreezerResponseDTO buscarPorId(Long id);
    FreezerResponseDTO atualizarLimites(Long id, BigDecimal min, BigDecimal max);
    void alterarStatus(Long id, FreezerStatusDTO dto);
    boolean verificarOperacionalidade(Long id);
}
