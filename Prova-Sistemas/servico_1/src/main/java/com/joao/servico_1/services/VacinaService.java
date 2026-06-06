package com.joao.servico_1.services;

import com.joao.servico_1.dtos.VacinaDTO;
import com.joao.servico_1.models.Vacina;
import com.joao.servico_1.repositories.VacinaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class VacinaService {

    @Autowired
    private VacinaRepository repository;

    public List<VacinaDTO> listar() {
        return repository.findAll().stream().map(this::toDTO).toList();
    }

    public VacinaDTO buscarPorId(Long id) {
        Vacina vacina = repository.findById(id).orElseThrow();

        return toDTO(vacina);
    }

    public VacinaDTO salvar(VacinaDTO dto) {

        Vacina vacina = new Vacina();

        vacina.setNome(dto.nome());
        vacina.setFabricante(dto.fabricante());
        vacina.setTipo(dto.tipo());
        vacina.setDosesPorFrasco(dto.dosesPorFrasco());
        vacina.setDescricao(dto.descricao());
        vacina.setCriadoEm(LocalDateTime.now());

        vacina = repository.save(vacina);

        return toDTO(vacina);
    }

    public VacinaDTO atualizar(Long id, VacinaDTO dto) {

        Vacina vacina = repository.findById(id).orElseThrow();

        vacina.setNome(dto.nome());
        vacina.setFabricante(dto.fabricante());
        vacina.setTipo(dto.tipo());
        vacina.setDosesPorFrasco(dto.dosesPorFrasco());
        vacina.setDescricao(dto.descricao());

        vacina = repository.save(vacina);

        return toDTO(vacina);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }

    private VacinaDTO toDTO(Vacina vacina) {
        return new VacinaDTO(vacina.getId(), vacina.getNome(), vacina.getFabricante(), vacina.getTipo(), vacina.getDosesPorFrasco(), vacina.getDescricao(), vacina.getCriadoEm());
    }
}
