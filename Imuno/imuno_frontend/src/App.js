import { Routes, Route } from "react-router-dom";

import "./App.css";

import Login from "./pages/Login";

import { Dashboard } from "./pages/Dashboard";

import { Freezers } from "./pages/Freezers";

import { Lotes } from "./pages/Lotes";

import { Vacinas } from "./pages/Vacinas";

import { Pacientes } from "./pages/Pacientes";

import { Fornecedores } from "./pages/Fornecedores";

import { Sidebar } from "./components/Sidebar";

import { Header } from "./components/Header";

function App() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* Sistema */}
      <Route path="/*" element={<AppLayout />} />
    </Routes>
  );
}

function AppLayout() {
  return (
    <div className="layout">
      <Sidebar />

      <div className="page-area">
        <Header
          title="Dashboard"
          subtitle="Sistema de vacinação"
          userName="João"
        />

        <main className="page-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="/freezers" element={<Freezers />} />

            <Route path="/lotes" element={<Lotes />} />

            <Route path="/vacinas" element={<Vacinas />} />

            <Route path="/pacientes" element={<Pacientes />} />

            <Route path="/fornecedores" element={<Fornecedores />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
