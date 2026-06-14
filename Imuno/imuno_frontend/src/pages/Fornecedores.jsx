import Crud from "../components/Crud";
import { useState, useEffect } from "react";

export function Fornecedores() {
  const [fornecedores, setFornecedores] = useState([]);
  const [busca, setBusca] = useState("");
  async function carregarFornecedores(textoBusca = "") {
    try {
      let url = "http://localhost:8080/api/sistemas/fornecedores/all";
      if (textoBusca.trim()) {
        url = `http://localhost:8080/api/sistemas/fornecedores/all/${encodeURIComponent(textoBusca)}`;
      }
      console.log(url);
      const response = await fetch(url);
      const data = await response.json();
      setFornecedores(data);
    } catch (error) {
      console.error("Erro ao buscar fornecedores:", error);
    }
  }

  useEffect(() => {
    carregarFornecedores();
  }, []);

  function handleBusca(event) {
    const valor = event.target.value;
    setBusca(valor);
    carregarFornecedores(valor);
  }

  return (
    <Crud
      title="Fornecedores"
      buttonText="Cadastrar Fornecedor"
      searchPlaceholder="Buscar por nome ou CNPJ"
      searchValue={busca}
      onSearchChange={handleBusca}
      columns={[
        { key: "razaoSocial", label: "Razão Social" },
        { key: "cnpj", label: "CNPJ" },
        { key: "telefone", label: "Telefone" },
        { key: "email", label: "E-mail" },
      ]}
      data={fornecedores}
    />
  );
}
