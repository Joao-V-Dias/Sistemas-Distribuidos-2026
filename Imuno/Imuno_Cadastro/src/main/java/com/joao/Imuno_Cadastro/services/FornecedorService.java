package com.joao.Imuno_Cadastro.services;

import com.joao.Imuno_Cadastro.dtos.FornecedorRequestDTO;
import com.joao.Imuno_Cadastro.dtos.FornecedorResponseDTO;

import java.util.List;

public interface FornecedorService {

    FornecedorResponseDTO cadastrar(FornecedorRequestDTO dto);
    List<FornecedorResponseDTO>
    listarAtivos();
    FornecedorResponseDTO buscarPorId(Long id);
    FornecedorResponseDTO atualizar(Long id, FornecedorRequestDTO dto);
    void inativar(Long id);
}
