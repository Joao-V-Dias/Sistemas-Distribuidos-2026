package com.joao.Imuno_Estoque.services.impl;

import com.joao.Imuno_Estoque.dtos.BaixaLoteDTO;
import com.joao.Imuno_Estoque.dtos.LoteEntradaDTO;
import com.joao.Imuno_Estoque.dtos.LoteResponseDTO;
import com.joao.Imuno_Estoque.dtos.TransferenciaLoteDTO;
import com.joao.Imuno_Estoque.models.Lote;
import com.joao.Imuno_Estoque.models.Vacina;
import com.joao.Imuno_Estoque.models.enums.StatusLote;
import com.joao.Imuno_Estoque.models.enums.TipoBaixa;
import com.joao.Imuno_Estoque.repositories.LoteRepository;
import com.joao.Imuno_Estoque.repositories.VacinaRepository;
import com.joao.Imuno_Estoque.services.LoteService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LoteServiceImpl implements LoteService {

    private final LoteRepository loteRepository;
    private final VacinaRepository vacinaRepository;

    @Override
    public LoteResponseDTO registrarEntrada(
            LoteEntradaDTO dto
    ) {

        if (loteRepository.existsByNumeroLote(
                dto.numeroLote()
        )) {
            throw new IllegalArgumentException(
                    "Número de lote já cadastrado"
            );
        }

        Vacina vacina = vacinaRepository
                .findById(dto.vacinaId())
                .orElseThrow(() ->
                        new EntityNotFoundException(
                                "Vacina não encontrada"
                        )
                );

        // TODO: validar freezer via microsserviço
        // TODO: validar fornecedor via microsserviço

        Lote lote = new Lote();

        lote.setVacina(vacina);
        lote.setFornecedorId(dto.fornecedorId());
        lote.setFreezerId(dto.freezerId());
        lote.setNumeroLote(dto.numeroLote());
        lote.setDataValidade(dto.dataValidade());
        lote.setQuantidadeInicial(
                dto.quantidadeInicial()
        );

        lote.setQuantidadeAtual(
                dto.quantidadeInicial()
        );

        lote.setStatus(StatusLote.ATIVO);

        lote = loteRepository.save(lote);

        return toResponseDTO(lote);
    }

    @Override
    public List<LoteResponseDTO> consultarEstoque(
            Long freezerId,
            Long vacinaId
    ) {

        List<Lote> lotes;

        if (freezerId != null
                && vacinaId != null) {

            lotes = loteRepository
                    .findByFreezerIdAndVacinaId(
                            freezerId,
                            vacinaId
                    );

        } else if (freezerId != null) {

            lotes = loteRepository
                    .findByFreezerId(
                            freezerId
                    );

        } else if (vacinaId != null) {

            lotes = loteRepository
                    .findByVacinaId(
                            vacinaId
                    );

        } else {

            lotes = loteRepository.findAll();
        }

        return lotes.stream()
                .map(this::toResponseDTO)
                .toList();
    }

    @Override
    public void processarBaixa(
            Long id,
            BaixaLoteDTO dto
    ) {

        Lote lote = buscarLote(id);

        validarLoteDisponivel(lote);

        if (dto.tipoBaixa()
                == TipoBaixa.APLICACAO
                && lote.getQuantidadeAtual()
                < dto.quantidadeDoses()) {

            throw new IllegalStateException(
                    "Estoque insuficiente"
            );
        }

        lote.setQuantidadeAtual(
                lote.getQuantidadeAtual()
                        - dto.quantidadeDoses()
        );

        lote.setJustificativa(
                dto.justificativa()
        );

        if (lote.getQuantidadeAtual()
                <= 0) {

            lote.setQuantidadeAtual(0);
            lote.setStatus(
                    StatusLote.ESGOTADO
            );
        }

        loteRepository.save(lote);
    }

    @Override
    public void transferirFreezer(
            Long id,
            TransferenciaLoteDTO dto
    ) {

        Lote lote = buscarLote(id);

        validarLoteDisponivel(lote);

        // TODO: validar freezer operacional
        lote.setFreezerId(
                dto.novoFreezerId()
        );

        lote.setJustificativa(
                dto.justificativa()
        );

        loteRepository.save(lote);
    }

    @Override
    public void bloquearLote(
            Long id,
            String justificativa
    ) {

        Lote lote = buscarLote(id);

        lote.setStatus(
                StatusLote.BLOQUEADO
        );

        lote.setJustificativa(
                justificativa
        );

        loteRepository.save(lote);
    }

    @Override
    public List<LoteResponseDTO>
    verificarLotesVencidos() {

        List<Lote> lotes =
                loteRepository
                        .findByDataValidadeBefore(
                                LocalDate.now()
                        );

        lotes.forEach(lote ->
                lote.setStatus(
                        StatusLote.VENCIDO
                )
        );

        loteRepository.saveAll(lotes);

        return lotes.stream()
                .map(this::toResponseDTO)
                .toList();
    }

    private Lote buscarLote(Long id) {

        return loteRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException(
                                "Lote não encontrado"
                        )
                );
    }

    private void validarLoteDisponivel(
            Lote lote
    ) {

        if (lote.getStatus()
                == StatusLote.BLOQUEADO) {

            throw new IllegalStateException(
                    "Lote bloqueado"
            );
        }

        if (lote.getDataValidade()
                .isBefore(LocalDate.now())) {

            lote.setStatus(
                    StatusLote.VENCIDO
            );

            loteRepository.save(lote);

            throw new IllegalStateException(
                    "Lote vencido"
            );
        }
    }

    private LoteResponseDTO toResponseDTO(
            Lote lote
    ) {

        return new LoteResponseDTO(
                lote.getId(),
                lote.getVacina().getNome(),
                lote.getNumeroLote(),
                lote.getDataValidade()
                        .toString(),
                lote.getQuantidadeAtual(),
                lote.getStatus().name(),
                lote.getFreezerId()
        );
    }
}
