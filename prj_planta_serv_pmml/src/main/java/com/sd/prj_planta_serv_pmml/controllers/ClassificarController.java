package com.sd.prj_planta_serv_pmml.controllers;

import com.sd.prj_planta_serv_pmml.dtos.ClasseRecordDTO;
import com.sd.prj_planta_serv_pmml.dtos.FlorRecordDTO;
import com.sd.prj_planta_serv_pmml.services.ClassificarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pmml/")
public class ClassificarController {

    @Autowired
    private ClassificarService classificarService;

    @CrossOrigin(origins = "*")
    @PostMapping
    public ClasseRecordDTO Classificar(@RequestBody FlorRecordDTO florRecordDTO){
        return classificarService.classificar(florRecordDTO);
    }
}
