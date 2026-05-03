package com.sd.prj_planta_serv_1.controllers;

import com.sd.prj_planta_serv_1.dtos.FlorRecordDTO;
import com.sd.prj_planta_serv_1.models.Flor;
import com.sd.prj_planta_serv_1.models.Planta;
import com.sd.prj_planta_serv_1.services.FlorService;
import com.sd.prj_planta_serv_1.services.PlantaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plantas")
public class PlantaController {

    @Autowired
    private PlantaService plantaService;

    @CrossOrigin(origins = "*")
    @GetMapping
    public List<Planta> getPlantas() {
        return plantaService.getPlantas();
    }

    @CrossOrigin(origins = "*")
    @PostMapping
    public Planta createPLanta(@RequestBody Planta planta){
        return plantaService.salvarPlanta(planta);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping
    public void deleteFlor(@RequestBody Planta planta){
        plantaService.excluirPlanta(planta.getIdplanta());
    }
}
