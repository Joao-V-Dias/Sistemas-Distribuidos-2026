package com.joao.servico_1.models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "vacina")
@Data
public class Vacina {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String fabricante;

    private String tipo;

    @Column(name = "doses_por_frasco")
    private Integer dosesPorFrasco;

    private String descricao;

    @Column(name = "criado_em")
    private LocalDateTime criadoEm;
}