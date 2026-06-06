package com.joao.Imuno_Estoque.services;

import com.joao.Imuno_Estoque.dtos.BaixaLoteDTO;
import com.joao.Imuno_Estoque.dtos.LoteEntradaDTO;
import com.joao.Imuno_Estoque.dtos.LoteResponseDTO;
import com.joao.Imuno_Estoque.dtos.TransferenciaLoteDTO;

import java.util.List;

public interface LoteService {

    LoteResponseDTO registrarEntrada(LoteEntradaDTO dto);
    List<LoteResponseDTO> consultarEstoque(Long freezerId, Long vacinaId);
    void processarBaixa(Long id, BaixaLoteDTO dto);
    void transferirFreezer(Long id, TransferenciaLoteDTO dto);
    void bloquearLote(Long id, String justificativa);
    List<LoteResponseDTO> verificarLotesVencidos();
}
