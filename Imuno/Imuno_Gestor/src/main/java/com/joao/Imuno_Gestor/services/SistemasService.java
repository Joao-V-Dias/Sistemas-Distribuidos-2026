package com.joao.Imuno_Gestor.services;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class SistemasService {
    private RestTemplate restTemplate;


    public SistemasService() {
        this.restTemplate = new RestTemplate();
    }

    // --------------------
    // Servico Cadastro
    // --------------------

    // --------------------
    // Servico Estoque
    // --------------------

    // --------------------
    // Servico Registro
}
