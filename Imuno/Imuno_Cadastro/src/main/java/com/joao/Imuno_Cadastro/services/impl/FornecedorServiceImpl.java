package com.joao.Imuno_Cadastro.services.impl;

import com.joao.Imuno_Cadastro.dtos.FornecedorRequestDTO;
import com.joao.Imuno_Cadastro.dtos.FornecedorResponseDTO;
import com.joao.Imuno_Cadastro.models.Fornecedor;
import com.joao.Imuno_Cadastro.repositories.FornecedorRepository;
import com.joao.Imuno_Cadastro.services.FornecedorService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FornecedorServiceImpl implements FornecedorService {

    private final FornecedorRepository fornecedorRepository;

    @Override
    public FornecedorResponseDTO cadastrar(FornecedorRequestDTO dto) {
        if (fornecedorRepository.existsByCnpj(
                dto.cnpj()
        )) {
            throw new IllegalArgumentException(
                    "Já existe um fornecedor com esse CNPJ"
            );
        }

        Fornecedor fornecedor = new Fornecedor();

        fornecedor.setRazaoSocial(dto.razaoSocial());
        fornecedor.setNomeFantasia(dto.nomeFantasia());
        fornecedor.setCnpj(dto.cnpj());
        fornecedor.setTelefone(dto.telefone());
        fornecedor.setEmail(dto.email());
        fornecedor.setEndereco(dto.endereco());
        fornecedor.setCidade(dto.cidade());
        fornecedor.setEstado(dto.estado());
        fornecedor = fornecedorRepository.save(fornecedor);

        return toResponseDTO(fornecedor);
    }

    @Override
    public List<FornecedorResponseDTO> listarAtivos() {
        return fornecedorRepository
                .findByAtivoTrue()
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    @Override
    public List<FornecedorResponseDTO> buscarFornecedores() {
        List<FornecedorResponseDTO> dtos = new ArrayList<>();
        List<Fornecedor> lstFornecedor =  fornecedorRepository.findAll();
        for (Fornecedor fornecedor : lstFornecedor) {
            dtos.add(toResponseDTO(fornecedor));
        }
        return dtos;
    }

    @Override
    public List<FornecedorResponseDTO> buscarFornecedores(String text) {
        List<FornecedorResponseDTO> dtos = new ArrayList<>();
        List<Fornecedor> lstFornecedor =  fornecedorRepository.buscarPorNomeOuCnpj(text);
        for (Fornecedor fornecedor : lstFornecedor) {
            dtos.add(toResponseDTO(fornecedor));
        }
        return dtos;
    }

    @Override
    public FornecedorResponseDTO buscarPorId(Long id) {
        Fornecedor fornecedor = buscarFornecedor(id);
        return toResponseDTO(fornecedor);
    }

    @Override
    public FornecedorResponseDTO atualizar(Long id, FornecedorRequestDTO dto) {
        Fornecedor fornecedor = buscarFornecedor(id);

        fornecedor.setRazaoSocial(dto.razaoSocial());
        fornecedor.setNomeFantasia(dto.nomeFantasia());
        fornecedor.setTelefone(dto.telefone());
        fornecedor.setEmail(dto.email());
        fornecedor.setEndereco(dto.endereco());
        fornecedor.setCidade(dto.cidade());
        fornecedor.setEstado(dto.estado());
        fornecedor = fornecedorRepository.save(fornecedor);

        return toResponseDTO(fornecedor);
    }

    @Override
    public void inativar(Long id) {
        Fornecedor fornecedor = buscarFornecedor(id);
        fornecedor.setAtivo(false);
        fornecedorRepository.save(fornecedor);
    }

    private Fornecedor buscarFornecedor(Long id) {
        return fornecedorRepository
                .findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException(
                                "Fornecedor não encontrado com id: "
                                        + id
                        )
                );
    }

    private FornecedorResponseDTO toResponseDTO(Fornecedor fornecedor) {
        return new FornecedorResponseDTO(
                fornecedor.getId(),
                fornecedor.getRazaoSocial(),
                fornecedor.getCnpj(),
                fornecedor.getTelefone(),
                fornecedor.getEmail(),
                fornecedor.getAtivo()
        );
    }
}
