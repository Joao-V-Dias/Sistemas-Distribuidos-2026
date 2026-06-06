package com.joao.Imuno_Cadastro.repositories;

import com.joao.Imuno_Cadastro.models.Freezer;
import com.joao.Imuno_Cadastro.models.enums.StatusFreezer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FreezerRepository extends JpaRepository<Freezer, Long> {

    boolean existsByNumeroSerie(String numeroSerie);
    Optional<Freezer> findByNumeroSerie(String numeroSerie);
    List<Freezer> findByStatus(StatusFreezer status);
}
