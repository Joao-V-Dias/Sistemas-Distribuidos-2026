package com.joao.Imuno_Cadastro.repositories;

import com.joao.Imuno_Cadastro.models.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {

    boolean existsByCpf(String cpf);
    Optional<Paciente> findByCpf(String cpf);
    List<Paciente> findByAtivoTrue();
}
