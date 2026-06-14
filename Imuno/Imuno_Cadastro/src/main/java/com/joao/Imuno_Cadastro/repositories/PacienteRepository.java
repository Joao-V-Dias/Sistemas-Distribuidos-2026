package com.joao.Imuno_Cadastro.repositories;

import com.joao.Imuno_Cadastro.models.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {

    boolean existsByCpf(String cpf);
    Optional<Paciente> findByCpf(String cpf);
    List<Paciente> findByAtivoTrue();

    @Query("""
        SELECT p
        FROM Paciente p
        WHERE LOWER(p.nome)
        LIKE LOWER(CONCAT('%', :busca, '%'))
        OR p.cpf LIKE CONCAT('%', :busca, '%')
    """)
    List<Paciente> buscarPorNomeOuCpf(@Param("busca") String busca);
}
