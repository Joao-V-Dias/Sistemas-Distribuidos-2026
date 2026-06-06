package com.joao.Imuno_Estoque.repositories;

import com.joao.Imuno_Estoque.models.Lote;
import com.joao.Imuno_Estoque.models.enums.StatusLote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface LoteRepository extends JpaRepository<Lote,Long> {

    boolean existsByNumeroLote(String numeroLote);
    List<Lote> findByFreezerId(Long freezerId);
    List<Lote> findByVacinaId(Long vacinaId);
    List<Lote> findByFreezerIdAndVacinaId(Long freezerId, Long vacinaId);
    List<Lote> findByDataValidadeBefore(LocalDate data);
    List<Lote> findByStatus(StatusLote status);
}
