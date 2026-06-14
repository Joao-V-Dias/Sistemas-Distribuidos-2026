package com.joao.Imuno_Cadastro.repositories;

import com.joao.Imuno_Cadastro.models.Freezer;
import com.joao.Imuno_Cadastro.models.enums.StatusFreezer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FreezerRepository extends JpaRepository<Freezer, Long> {

    boolean existsByNumeroSerie(String numeroSerie);
    List<Freezer> findByNumeroSerieContainingIgnoreCase(String numeroSerie);
    List<Freezer> findByStatus(StatusFreezer status);
}
