package com.joao.Imuno_Gestor.controllers;

import com.joao.Imuno_Gestor.services.SistemasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sistemas")
@CrossOrigin(
        origins =
                "http://localhost:3000",

        methods = {
                RequestMethod.GET,
                RequestMethod.POST,
                RequestMethod.PUT,
                RequestMethod.DELETE,
                RequestMethod.OPTIONS
        }
)
public class SistemasController {

    @Autowired
    private SistemasService sistemasService;

    //-----------------
    //Pacientes
    //-----------------

    @PutMapping("/pacientes/{id}")
    public ResponseEntity<String> atualizarVacina(@PathVariable Long id, @RequestBody String vacina) {
        RequestEntity<String> request = RequestEntity.put("").body(vacina);
        return sistemasService.atualizarPaciente(id, request);
    }

    @GetMapping("/pacientes/all")
    public ResponseEntity<String> buscarPacientes(){
        return sistemasService.buscarPacientes();
    }

    @GetMapping("/pacientes/all/{text}")
    public ResponseEntity<String> buscarPacientes(@PathVariable String text){
        return sistemasService.buscarPacientes(text);
    }

    //-----------------
    //Fornecedores
    //-----------------

    @GetMapping("/fornecedores/all")
    public ResponseEntity<String> buscarFornecedores(){
        return sistemasService.buscarFornecedores();
    }

    @GetMapping("/fornecedores/all/{text}")
    public ResponseEntity<String> buscarFornecedores(@PathVariable String text){
        return sistemasService.buscarFornecedores(text);
    }

    //-----------------
    //Freezers
    //-----------------

    @GetMapping("/freezers/all")
    public ResponseEntity<String> buscarFreezers(){
        return sistemasService.buscarFreezers();
    }

    @GetMapping("/freezers/all/{text}")
    public ResponseEntity<String> buscarFreezers(@PathVariable String text){
        return sistemasService.buscarFreezers(text);
    }
}
