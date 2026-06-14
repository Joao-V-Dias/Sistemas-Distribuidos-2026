import Crud from "../components/Crud";

export function Vacinas() {
  const vacinas = [
    {
      nome: "Influenza Trivalente",
      tipo: "náo definido",
      doses_por_frasco: 2,
      intervalo_doses_dias: 15,
    },
  ];

  return (
    <Crud
      title="Vacinas"
      buttonText="Adicionar Vacina"
      searchPlaceholder="Buscar por nome"
      columns={[
        { key: "nome", label: "Nome" },
        { key: "tipo", label: "Tipo" },
        { key: "doses_por_frasco", label: "Doses/Frasco" },
        { key: "intervalo_doses_dias", label: "Intervalo/Dia" },
      ]}
      data={vacinas}
    />
  );
}
