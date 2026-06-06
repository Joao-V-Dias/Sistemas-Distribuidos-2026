package com.joao.Imuno_Cadastro.repositories;

import com.joao.Imuno_Cadastro.models.Fornecedor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FornecedorRepository extends JpaRepository<Fornecedor, Long> {
    boolean existsByCnpj(String cnpj);
    Optional<Fornecedor> findByCnpj(String cnpj);
    List<Fornecedor> findByAtivoTrue();
}
