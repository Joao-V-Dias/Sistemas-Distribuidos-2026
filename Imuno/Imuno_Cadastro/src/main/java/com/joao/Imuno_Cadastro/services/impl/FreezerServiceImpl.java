package com.joao.Imuno_Cadastro.services.impl;

import com.joao.Imuno_Cadastro.dtos.FreezerRequestDTO;
import com.joao.Imuno_Cadastro.dtos.FreezerResponseDTO;
import com.joao.Imuno_Cadastro.dtos.FreezerStatusDTO;
import com.joao.Imuno_Cadastro.models.Freezer;
import com.joao.Imuno_Cadastro.models.enums.StatusFreezer;
import com.joao.Imuno_Cadastro.repositories.FreezerRepository;
import com.joao.Imuno_Cadastro.services.FreezerService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class FreezerServiceImpl implements FreezerService {

    @Autowired
    private FreezerRepository freezerRepository;

    @Override
    public FreezerResponseDTO cadastrar(FreezerRequestDTO dto) {

        if (freezerRepository.existsByNumeroSerie(dto.numeroSerie())) {
            throw new IllegalArgumentException("Número de série já cadastrado");
        }

        validarTemperaturas(dto.tempMinSegura(), dto.tempMaxSegura());

        Freezer freezer = new Freezer();
        freezer.setNumeroSerie(dto.numeroSerie());
        freezer.setModelo(dto.modelo());
        freezer.setLocalizacao(dto.localizacao());
        freezer.setTempMinSegura(dto.tempMinSegura());
        freezer.setTempMaxSegura(dto.tempMaxSegura());
        freezer = freezerRepository.save(freezer);
        return toResponseDTO(freezer);
    }

    @Override
    public List<FreezerResponseDTO> buscarFreezers() {
        List<Freezer> freezers = freezerRepository.findAll();
        List<FreezerResponseDTO> dtos = new ArrayList<>();
        for(Freezer freezer : freezers) {
            dtos.add(toResponseDTO(freezer));
        }
        return dtos;
    }

    @Override
    public List<FreezerResponseDTO> buscarFreezers(String serial) {
        List<Freezer> freezers = freezerRepository.findByNumeroSerieContainingIgnoreCase(serial);
        List<FreezerResponseDTO> dtos = new ArrayList<>();
        for(Freezer freezer : freezers) {
            dtos.add(toResponseDTO(freezer));
        }
        return dtos;
    }

    @Override
    public FreezerResponseDTO buscarPorId(Long id) {
        return toResponseDTO(buscarFreezer(id));
    }

    @Override
    public FreezerResponseDTO atualizarLimites(Long id, BigDecimal min, BigDecimal max) {

        validarTemperaturas(min, max);
        Freezer freezer = buscarFreezer(id);
        freezer.setTempMinSegura(min);
        freezer.setTempMaxSegura(max);
        freezer = freezerRepository.save(freezer);
        return toResponseDTO(freezer);
    }

    @Override
    public void alterarStatus(Long id, FreezerStatusDTO dto) {

        Freezer freezer = buscarFreezer(id);
        freezer.setStatus(dto.status());
        freezerRepository.save(freezer);
    }

    @Override
    public boolean verificarOperacionalidade(Long id) {

        Freezer freezer = buscarFreezer(id);
        return freezer.getStatus() == StatusFreezer.OPERACIONAL;
    }

    private Freezer buscarFreezer(Long id) {

        return freezerRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Freezer não encontrado com id: " + id));
    }

    private void validarTemperaturas(BigDecimal min, BigDecimal max) {

        if (min.compareTo(max) >= 0) {
            throw new IllegalArgumentException("A temperatura mínima deve ser menor que a máxima");
        }
    }

    private FreezerResponseDTO toResponseDTO(Freezer freezer) {
        return new FreezerResponseDTO(freezer.getId(), freezer.getNumeroSerie(), freezer.getModelo(), freezer.getLocalizacao(), freezer.getStatus(), freezer.getTempMinSegura(), freezer.getTempMaxSegura());
    }
}
