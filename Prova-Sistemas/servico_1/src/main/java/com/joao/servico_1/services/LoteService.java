package com.joao.servico_1.services;

import com.joao.servico_1.dtos.LoteDTO;
import com.joao.servico_1.models.Lote;
import com.joao.servico_1.models.Vacina;
import com.joao.servico_1.repositories.LoteRepository;
import com.joao.servico_1.repositories.VacinaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class LoteService {

    @Autowired
    private LoteRepository repository;
    @Autowired
    private VacinaRepository vacinaRepository;

    public List<LoteDTO> listar() {
        return repository.findAll().stream().map(this::toDTO).toList();
    }

    public LoteDTO buscarPorId(Long id) {
        Lote lote = repository.findById(id).orElseThrow();

        return toDTO(lote);
    }

    public LoteDTO salvar(LoteDTO dto) {

        Vacina vacina = vacinaRepository.findById(dto.vacinaId()).orElseThrow();

        Lote lote = new Lote();

        lote.setVacina(vacina);
        lote.setFornecedorId(dto.fornecedorId());
        lote.setNumeroLote(dto.numeroLote());
        lote.setDataValidade(dto.dataValidade());
        lote.setQuantidadeInicial(dto.quantidadeInicial());
        lote.setQuantidadeAtual(dto.quantidadeAtual());
        lote.setStatus(dto.status());
        lote.setJustificativa(dto.justificativa());
        lote.setCriadoEm(LocalDateTime.now());

        lote = repository.save(lote);

        return toDTO(lote);
    }

    public LoteDTO atualizar(Long id, LoteDTO dto) {

        Lote lote = repository.findById(id).orElseThrow();

        Vacina vacina = vacinaRepository.findById(dto.vacinaId()).orElseThrow();

        lote.setVacina(vacina);
        lote.setFornecedorId(dto.fornecedorId());
        lote.setNumeroLote(dto.numeroLote());
        lote.setDataValidade(dto.dataValidade());
        lote.setQuantidadeInicial(dto.quantidadeInicial());
        lote.setQuantidadeAtual(dto.quantidadeAtual());
        lote.setStatus(dto.status());
        lote.setJustificativa(dto.justificativa());
        lote.setAtualizadoEm(LocalDateTime.now());

        lote = repository.save(lote);

        return toDTO(lote);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }

    private LoteDTO toDTO(Lote lote) {
        return new LoteDTO(lote.getId(), lote.getVacina().getId(), lote.getFornecedorId(), lote.getNumeroLote(), lote.getDataValidade(), lote.getQuantidadeInicial(), lote.getQuantidadeAtual(), lote.getStatus(), lote.getJustificativa(), lote.getCriadoEm(), lote.getAtualizadoEm());
    }
}
