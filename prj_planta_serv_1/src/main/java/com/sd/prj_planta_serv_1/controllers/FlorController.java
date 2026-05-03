package com.sd.prj_planta_serv_1.controllers;

import com.sd.prj_planta_serv_1.dtos.FlorRecordDTO;
import com.sd.prj_planta_serv_1.models.Flor;
import com.sd.prj_planta_serv_1.services.FlorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/flores")
public class FlorController {

    @Autowired
    private FlorService florService;

    @CrossOrigin(origins = "*")
    @GetMapping
    public List<Flor> getFlor(){
        return florService.getFlores();
    }

    @CrossOrigin(origins = "*")
    @PostMapping
    public Flor createFlor(@RequestBody FlorRecordDTO flor){
        return florService.salvarFlor(flor);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping
    public void deleteFlor(@RequestBody Flor flor){
        florService.deletarFlor(flor.getIdflor());
    }

}
