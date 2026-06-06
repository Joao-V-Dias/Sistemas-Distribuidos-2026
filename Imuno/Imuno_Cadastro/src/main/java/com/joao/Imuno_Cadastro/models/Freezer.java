package com.joao.Imuno_Cadastro.models;

import com.joao.Imuno_Cadastro.models.enums.StatusFreezer;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "freezer")
@Data
public class Freezer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero_serie", nullable = false, unique = true, length = 100)
    private String numeroSerie;

    @Column(nullable = false, length = 100)
    private String modelo;

    @Column(length = 200)
    private String localizacao;

    @Column(name = "temp_min_segura", nullable = false, precision = 5, scale = 2)
    private BigDecimal tempMinSegura;

    @Column(name = "temp_max_segura", nullable = false, precision = 5, scale = 2)
    private BigDecimal tempMaxSegura;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusFreezer status;

    @Column(name = "criado_em", nullable = false, updatable = false)
    private LocalDateTime criadoEm;

    @PrePersist
    public void prePersist() {
        this.criadoEm = LocalDateTime.now();

        if (this.status == null) {
            this.status = StatusFreezer.OPERACIONAL;
        }
    }
}
