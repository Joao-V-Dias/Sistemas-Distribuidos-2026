package com.joao.Imuno_Cadastro.services.impl;

import com.joao.Imuno_Cadastro.dtos.PacienteRequestDTO;
import com.joao.Imuno_Cadastro.dtos.PacienteResponseDTO;
import com.joao.Imuno_Cadastro.models.Paciente;
import com.joao.Imuno_Cadastro.repositories.PacienteRepository;
import com.joao.Imuno_Cadastro.services.PacienteService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PacienteServiceImpl implements PacienteService {

    @Autowired
    private PacienteRepository pacienteRepository;

    @Override
    public PacienteResponseDTO cadastrar(PacienteRequestDTO dto) {

        if (pacienteRepository.existsByCpf(dto.cpf())) {
            throw new IllegalArgumentException("Já existe um paciente com esse CPF");
        }

        Paciente paciente = new Paciente();
        paciente.setNome(dto.nome());
        paciente.setCpf(dto.cpf());
        paciente.setDataNascimento(dto.dataNascimento());
        paciente.setSexo(dto.sexo());
        paciente.setTelefone(dto.telefone());
        paciente.setObservacoes(dto.observacoes());
        paciente = pacienteRepository.save(paciente);
        return toResponseDTO(paciente);
    }

    @Override
    public List<PacienteResponseDTO> listarAtivos() {
        return pacienteRepository.findByAtivoTrue().stream().map(this::toResponseDTO).toList();
    }

    @Override
    public PacienteResponseDTO buscarPorId(Long id) {
        return toResponseDTO(buscarPaciente(id));
    }

    @Override
    public PacienteResponseDTO atualizar(Long id, PacienteRequestDTO dto) {
        Paciente paciente = buscarPaciente(id);
        paciente.setNome(dto.nome());
        paciente.setDataNascimento(dto.dataNascimento());
        paciente.setSexo(dto.sexo());
        paciente.setTelefone(dto.telefone());
        paciente.setObservacoes(dto.observacoes());
        paciente = pacienteRepository.save(paciente);

        return toResponseDTO(paciente);
    }

    @Override
    public void inativar(Long id) {
        Paciente paciente = buscarPaciente(id);
        paciente.setAtivo(false);
        pacienteRepository.save(paciente);
    }

    private Paciente buscarPaciente(Long id) {
        return pacienteRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Paciente não encontrado com id: " + id));
    }

    private PacienteResponseDTO toResponseDTO(Paciente paciente) {

        return new PacienteResponseDTO(paciente.getId(), paciente.getNome(), paciente.getCpf(), paciente.getDataNascimento(), paciente.getSexo(), paciente.getAtivo());
    }
}
