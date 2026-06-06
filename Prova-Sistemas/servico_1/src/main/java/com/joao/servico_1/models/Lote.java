package com.joao.servico_1.models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "lote")
@Data
public class Lote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "vacina_id")
    private Vacina vacina;

    @Column(name = "fornecedor_id")
    private String fornecedorId;

    @Column(name = "numero_lote")
    private String numeroLote;

    @Column(name = "data_validade")
    private LocalDate dataValidade;

    @Column(name = "quantidade_inicial")
    private Integer quantidadeInicial;

    @Column(name = "quantidade_atual")
    private Integer quantidadeAtual;

    private String status;

    private String justificativa;

    @Column(name = "criado_em")
    private LocalDateTime criadoEm;

    @Column(name = "atualizado_em")
    private LocalDateTime atualizadoEm;
}
