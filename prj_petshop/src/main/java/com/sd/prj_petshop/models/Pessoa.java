package com.sd.prj_petshop.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "pessoa")
public class Pessoa {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long idpessoa;
	
	@Column(nullable = false)
	private String nome;
	
	@Column(nullable = false)
	private String cpf;
	
	@Column(nullable = false)
	private String data_nasc;
	
	public Pessoa() {
		
	}
	
	public Pessoa(int i, String nome, String cpf, String data_nasc) {
		this.idpessoa = i;
		this.nome = nome;
		this.cpf = cpf;
		this.data_nasc = data_nasc;
	}
	private Long getIdpessoa() {
		return idpessoa;
	}
	private void setIdpessoa(Long idpessoa) {
		this.idpessoa = idpessoa;
	}
	private String getNome() {
		return nome;
	}
	private void setNome(String nome) {
		this.nome = nome;
	}
	private String getCpf() {
		return cpf;
	}
	private void setCpf(String cpf) {
		this.cpf = cpf;
	}
	private String getData_nasc() {
		return data_nasc;
	}
	private void setData_nasc(String data_nasc) {
		this.data_nasc = data_nasc;
	}
	
	
}
