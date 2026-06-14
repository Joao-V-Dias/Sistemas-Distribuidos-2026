import Crud from "../components/Crud";

export function Lotes() {
  const lotes = [
    {
      numero_lote: "LT-2026-0142",
      data_validade: "10-05-2005",
      quantidadeAtual: 10,
      status: "NORMAL",
    },
  ];

  return (
    <Crud
      title="Lotes"
      buttonText="Cadastrar Lotes"
      searchPlaceholder="Buscar por número"
      columns={[
        { key: "numero_lote", label: "Nº Lote" },
        { key: "data_validade", label: "Validade" },
        { key: "quantidadeAtual", label: "Quantidade" },
        { key: "status", label: "Status" },
      ]}
      data={lotes}
    />
  );
}
