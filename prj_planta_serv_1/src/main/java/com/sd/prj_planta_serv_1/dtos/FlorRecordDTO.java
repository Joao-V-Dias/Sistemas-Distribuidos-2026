package com.sd.prj_planta_serv_1.dtos;

public record FlorRecordDTO(Long idflor,
                            double comprimento_sepala,
                            double largura_sepala,
                            double comprimento_petala,
                            double largura_petala,
                            String cor,
                            String especieTipo,
                            Long idplanta) {
}
