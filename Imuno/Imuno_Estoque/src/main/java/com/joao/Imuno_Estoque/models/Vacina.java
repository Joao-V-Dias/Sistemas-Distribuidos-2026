package com.joao.Imuno_Estoque.models;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "vacina")
@Data
public class Vacina {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String nome;

    @Column(nullable = false, length = 150)
    private String fabricante;

    @Column(nullable = false, length = 100)
    private String tipo;

    @Column(name = "doses_por_frasco")
    private Integer dosesPorFrasco;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Column(name = "intervalo_doses_dias")
    private Integer intervaloDosesDias;

    @Column(name = "criado_em", nullable = false, updatable = false)
    private LocalDateTime criadoEm;

    @PrePersist
    public void prePersist() {
        this.criadoEm = LocalDateTime.now();
    }
}
