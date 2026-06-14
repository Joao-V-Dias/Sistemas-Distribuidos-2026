import Crud from "../components/Crud";
import { useState, useEffect } from "react";

export function Freezers() {
  const [freezers, setFreezers] = useState([]);
  const [busca, setBusca] = useState("");
  async function carregarFreezers(textoBusca = "") {
    try {
      let url = "http://localhost:8080/api/sistemas/freezers/all";
      if (textoBusca.trim()) {
        url = `http://localhost:8080/api/sistemas/freezers/all/${encodeURIComponent(textoBusca)}`;
      }
      console.log(url);
      const response = await fetch(url);
      const data = await response.json();
      setFreezers(data);
    } catch (error) {
      console.error("Erro ao buscar freezers:", error);
    }
  }

  useEffect(() => {
    carregarFreezers();
  }, []);

  function handleBusca(event) {
    const valor = event.target.value;
    setBusca(valor);
    carregarFreezers(valor);
  }

  return (
    <Crud
      title="Freezers"
      buttonText="Cadastrar Freezer"
      searchPlaceholder="Buscar por serial"
      searchValue={busca}
      onSearchChange={handleBusca}
      columns={[
        { key: "numeroSerie", label: "Nº Série" },
        { key: "modelo", label: "Modelo" },
        { key: "localizacao", label: "Localizacao" },
        { key: "status", label: "Status" },
      ]}
      data={freezers}
    />
  );
}
