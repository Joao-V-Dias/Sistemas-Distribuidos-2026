package com.joao.Imuno_Estoque.services.impl;

import com.joao.Imuno_Estoque.dtos.VacinaRequestDTO;
import com.joao.Imuno_Estoque.dtos.VacinaResponseDTO;
import com.joao.Imuno_Estoque.models.Vacina;
import com.joao.Imuno_Estoque.repositories.VacinaRepository;
import com.joao.Imuno_Estoque.services.VacinaService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VacinaServiceImpl implements VacinaService {

    private final VacinaRepository vacinaRepository;

    @Override
    public VacinaResponseDTO cadastrar(VacinaRequestDTO dto) {

        if (vacinaRepository.existsByNomeIgnoreCase(dto.nome())) {
            throw new IllegalArgumentException(
                    "Já existe uma vacina cadastrada com esse nome"
            );
        }

        Vacina vacina = new Vacina();

        vacina.setNome(dto.nome());
        vacina.setFabricante(dto.fabricante());
        vacina.setTipo(dto.tipo());
        vacina.setDosesPorFrasco(dto.dosesPorFrasco());
        vacina.setDescricao(dto.descricao());
        vacina.setIntervaloDosesDias(dto.intervaloDosesDias());

        vacina = vacinaRepository.save(vacina);

        return toResponseDTO(vacina);
    }

    @Override
    public List<VacinaResponseDTO> listarAtivas() {
        return vacinaRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    @Override
    public VacinaResponseDTO buscarPorId(Long id) {

        Vacina vacina = vacinaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Vacina não encontrada com id: " + id
                ));

        return toResponseDTO(vacina);
    }

    @Override
    public VacinaResponseDTO atualizar(Long id, VacinaRequestDTO dto) {

        Vacina vacina = vacinaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Vacina não encontrada com id: " + id
                ));

        vacina.setNome(dto.nome());
        vacina.setFabricante(dto.fabricante());
        vacina.setTipo(dto.tipo());
        vacina.setDosesPorFrasco(dto.dosesPorFrasco());
        vacina.setDescricao(dto.descricao());
        vacina.setIntervaloDosesDias(dto.intervaloDosesDias());

        vacina = vacinaRepository.save(vacina);

        return toResponseDTO(vacina);
    }

    private VacinaResponseDTO toResponseDTO(Vacina vacina) {
        return new VacinaResponseDTO(
                vacina.getId(),
                vacina.getNome(),
                vacina.getFabricante(),
                vacina.getTipo(),
                vacina.getDosesPorFrasco()
        );
    }
}
