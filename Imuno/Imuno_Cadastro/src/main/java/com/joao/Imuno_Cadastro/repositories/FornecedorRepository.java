package com.joao.Imuno_Cadastro.repositories;

import com.joao.Imuno_Cadastro.models.Fornecedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FornecedorRepository extends JpaRepository<Fornecedor, Long> {
    boolean existsByCnpj(String cnpj);
    Optional<Fornecedor> findByCnpj(String cnpj);
    List<Fornecedor> findByAtivoTrue();

    @Query("""
        SELECT p
        FROM Fornecedor p
        WHERE LOWER(p.razaoSocial)
        LIKE LOWER(CONCAT('%', :busca, '%'))
        OR p.cnpj LIKE CONCAT('%', :busca, '%')
    """)
    List<Fornecedor> buscarPorNomeOuCnpj(@Param("busca") String busca);
}
