package com.joao.Imuno_Estoque.repositories;

import com.joao.Imuno_Estoque.models.Vacina;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VacinaRepository extends JpaRepository<Vacina, Long> {
    boolean existsByNomeIgnoreCase(String nome);
}
