package com.sd.prj_planta_serv_1.services;

import com.sd.prj_planta_serv_1.dtos.FlorRecordDTO;
import com.sd.prj_planta_serv_1.models.Flor;
import com.sd.prj_planta_serv_1.models.Planta;
import com.sd.prj_planta_serv_1.repositories.FlorRepository;
import com.sd.prj_planta_serv_1.repositories.PlantaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class FlorService {

    private final FlorRepository florRepository;
    private final PlantaRepository plantaRepository;

    public FlorService(FlorRepository florRepository, PlantaRepository plantaRepository) {
        this.florRepository = florRepository;
        this.plantaRepository = plantaRepository;
    }

    public List<Flor> getFlores() {
        return florRepository.findAll();
    }

    public Flor getFlor(Long idflor) {
        return florRepository.findById(idflor).get();
    }

    public Flor salvarFlor(FlorRecordDTO florRecordDTO) {
        Flor flor = new Flor();
        flor.setIdflor(florRecordDTO.idflor());
        flor.setComprimento_petala(florRecordDTO.comprimento_petala());
        flor.setComprimento_sepala(florRecordDTO.comprimento_sepala());
        flor.setLargura_petala(florRecordDTO.largura_petala());
        flor.setLargura_sepala(florRecordDTO.largura_sepala());
        flor.setCor(florRecordDTO.cor());
        flor.setEspecieTipo(florRecordDTO.especieTipo());
        flor.setPlanta(plantaRepository.findById(florRecordDTO.idplanta()).orElse(null));

        return florRepository.save(flor);
    }

    public void deletarFlor(Long idflor) {
        florRepository.deleteById(idflor);
    }
}
