import "./style.css";
import { Link, useLocation } from "react-router-dom";
import dash from "../../img/dashboard.svg";
import freezer from "../../img/ice.svg";
import lote from "../../img/box.svg";
import vacina from "../../img/vaccine.svg";
import paciente from "../../img/people.svg";
import fornecedores from "../../img/company.svg";
import aplicacao from "../../img/task.svg";
import usuarios from "../../img/users.svg";

const menuItems = [
  { label: "Dashboard", path: "/", icon: dash },
  { label: "Freezers", path: "/freezers", icon: freezer },
  { label: "Lotes", path: "/lotes", icon: lote },
  { label: "Vacinas", path: "/vacinas", icon: vacina },
  { label: "Pacientes", path: "/pacientes", icon: paciente },
  { label: "Fornecedores", path: "/fornecedores", icon: fornecedores },
  { label: "Aplicações", path: "/aplicacoes", icon: aplicacao },
  {
    label: "Usuários",
    path: "/usuarios",
    icon: usuarios,
    profiles: ["QA", "ADMIN"],
  },
  {
    label: "Audit Trail",
    path: "/audit",
    icon: "📄",
    profiles: ["AUDITOR"],
  },
];

export function Sidebar({ userProfile = "OPERADOR", userName = "Usuário" }) {
  const location = useLocation();

  const filteredMenuItems = menuItems.filter(
    (item) => !item.profiles || item.profiles.includes(userProfile),
  );

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>💉 ImunoPanel</h1>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {filteredMenuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`sidebar-link ${isActive ? "active" : ""}`}
                >
                  <img src={item.icon} alt={item.label} className="icon" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
