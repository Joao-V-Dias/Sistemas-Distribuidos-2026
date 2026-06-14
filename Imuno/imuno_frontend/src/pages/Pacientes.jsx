import Crud from "../components/Crud";
import EditPanel from "../components/EditPanel";
import { useState, useEffect } from "react";

export function Pacientes() {
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [openPanel, setOpenPanel] = useState(false);

  function visualizarPaciente(paciente) {
    setSelectedPaciente(paciente);
    setOpenPanel(true);
  }

  async function salvarPaciente(paciente) {
    try {
      console.log(paciente);
      await fetch(
        `http://localhost:8080/api/sistemas/pacientes/${paciente.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paciente),
        },
      );
      carregarPacientes();
    } catch (error) {
      console.error(error);
    }
  }

  const [pacientes, setPacientes] = useState([]);
  const [busca, setBusca] = useState("");
  async function carregarPacientes(textoBusca = "") {
    try {
      let url = "http://localhost:8080/api/sistemas/pacientes/all";
      if (textoBusca.trim()) {
        url = `http://localhost:8080/api/sistemas/pacientes/all/${encodeURIComponent(textoBusca)}`;
      }
      console.log(url);
      const response = await fetch(url);
      const data = await response.json();
      setPacientes(data);
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
    }
  }

  useEffect(() => {
    carregarPacientes();
  }, []);

  function handleBusca(event) {
    const valor = event.target.value;
    setBusca(valor);
    carregarPacientes(valor);
  }

  return (
    <>
      <Crud
        title="Pacientes"
        buttonText="Adicionar Paciente"
        searchPlaceholder="Buscar CPF ou nome"
        searchValue={busca}
        onSearchChange={handleBusca}
        onView={visualizarPaciente}
        columns={[
          {
            key: "nome",
            label: "Nome",
          },
          {
            key: "cpf",
            label: "CPF",
          },
          {
            key: "idade",
            label: "Idade",
          },
          {
            key: "sexo",
            label: "Sexo",
          },
        ]}
        data={pacientes}
      />
      <EditPanel
        isOpen={openPanel}
        onClose={() => setOpenPanel(false)}
        title="Paciente"
        data={selectedPaciente}
        fields={[
          {
            key: "nome",
            label: "Nome",
          },
          {
            key: "cpf",
            label: "CPF",
          },
          {
            key: "data_nascimento",
            label: "Data de Nascimento",
            type: "date",
          },
          {
            key: "telefone",
            label: "Telefone",
          },
          {
            key: "sexo",
            label: "Sexo",
            type: "select",
            options: ["M", "F"],
          },
          {
            key: "ativo",
            label: "Ativo",
            type: "checkbox",
          },
        ]}
        onSave={salvarPaciente}
      />
    </>
  );
}
