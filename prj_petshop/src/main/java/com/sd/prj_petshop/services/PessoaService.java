package com.sd.prj_petshop.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.sd.prj_petshop.models.Pessoa;
import com.sd.prj_petshop.repositories.PessoaRepository;

@Service
public class PessoaService {
	
	private final PessoaRepository pessoaRepository;
	
	protected PessoaService(PessoaRepository pessoaRepository) {
		super();
		this.pessoaRepository = pessoaRepository;
	}

	public List<Pessoa> getPessoas(){
		return pessoaRepository.findAll();
	}
	
	public Pessoa savePessoa(Pessoa pessoa) {
		return pessoaRepository.save(pessoa);
	}
}
