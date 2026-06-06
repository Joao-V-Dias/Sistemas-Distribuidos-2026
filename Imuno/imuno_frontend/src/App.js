import React, { useState, useMemo } from 'react';
import './App.css';

// ==========================================
// 1. INLINE SVG ICONS LIBRARY (AWS style)
// ==========================================
const Icons = {
  Syringe: () => (
    <svg className="icon" viewBox="0 0 24 24">
      <path d="M19 3H14.82C14.4 1.84 13.3 1 12 1S9.6 1.84 9.18 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M12 3C12.55 3 13 3.45 13 4S12.55 5 12 5 11 4.55 11 4 11.45 3 12 3M17 18H7V17H17V18M10.3 14.7L9 16H7V14L8.3 12.7C8.1 12.1 8 11.6 8 11C8 8.8 9.8 7 12 7C12.6 7 13.1 7.1 13.7 7.3L12 9H14V11H12.3L15.3 14H17V12.3L18.7 14C18.9 14.6 19 15.1 19 15.7C19 17.9 17.2 19.7 15 19.7C14.4 19.7 13.9 19.6 13.3 19.4L12 20.7H10V18.7L11.3 17.4C10.9 16.6 10.5 15.7 10.3 14.7Z"/>
    </svg>
  ),
  Dashboard: () => (
    <svg className="icon" viewBox="0 0 24 24">
      <path d="M13,3V9H21V3H13M13,21H21V11H13V21M3,21H11V15H3V21M3,13H11V3H3V13Z" />
    </svg>
  ),
  Freezers: () => (
    <svg className="icon" viewBox="0 0 24 24">
      <path d="M19,2H5A2,2 0 0,0 3,4V20A2,2 0 0,0 5,22H19A2,2 0 0,0 21,20V4A2,2 0 0,0 19,2M19,10H5V4H19V10M19,20H5V12H19V20M8,6V8H6V6H8M8,14V16H6V14H8Z" />
    </svg>
  ),
  Lotes: () => (
    <svg className="icon" viewBox="0 0 24 24">
      <path d="M12,16A3,3 0 0,1 9,13C9,11.88 9.61,10.9 10.5,10.39L10.5,4.5A1.5,1.5 0 0,1 12,3A1.5,1.5 0 0,1 13.5,4.5L13.5,10.39C14.39,10.9 15,11.88 15,13A3,3 0 0,1 12,16M12,18A5,5 0 0,0 17,13C17,10.95 15.72,9.2 13.9,8.45L13.9,4.5A1.9,1.9 0 0,0 12,2.6A1.9,1.9 0 0,0 10.1,4.5L10.1,8.45C8.28,9.2 7,10.95 7,13A5,5 0 0,0 12,18Z" />
    </svg>
  ),
  Vacinas: () => (
    <svg className="icon" viewBox="0 0 24 24">
      <path d="M19.5,3.09L15,7.59V6H13V8H15V9.59L10.59,14H9V12H7V14H5.41L3,16.41V21H7.59L10,18.59V17H12V19H14V17H15.41L19.5,12.91C20.35,11.75 20.76,10.33 20.76,8.91C20.76,5.75 19.5,3.09 19.5,3.09M6.76,19H5V17.24L7.24,15H9V16.76L6.76,19M16.5,11.82L13.18,8.5L15,6.68L18.32,10L16.5,11.82Z" />
    </svg>
  ),
  Pacientes: () => (
    <svg className="icon" viewBox="0 0 24 24">
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
  ),
  Fornecedores: () => (
    <svg className="icon" viewBox="0 0 24 24">
      <path d="M18,18.5A1.5,1.5 0 0,0 19.5,17A1.5,1.5 0 0,0 18,15.5A1.5,1.5 0 0,0 16.5,17A1.5,1.5 0 0,0 18,18.5M19.5,9.5L17,6H14V11H20V9.5M6,18.5A1.5,1.5 0 0,0 7.5,17A1.5,1.5 0 0,0 6,15.5A1.5,1.5 0 0,0 4.5,17A1.5,1.5 0 0,0 6,18.5M20,13V12H4V17A3,3 0 0,0 7,20A3,3 0 0,0 10,17H14A3,3 0 0,0 17,20A3,3 0 0,0 20,17V15A2,2 0 0,0 22,13V11A2,2 0 0,0 20,13M12,6V4H2V11H12V6M6,9V8H8V9H6Z" />
    </svg>
  ),
  Aplicações: () => (
    <svg className="icon" viewBox="0 0 24 24">
      <path d="M12.2,2C11.1,2 10.2,2.8 10.04,3.9L3,11L4.41,12.41L11,5.83V16H13V5.83L19.59,12.41L21,11L13.96,3.9C13.8,2.8 12.9,2 12.2,2M12,18A1,1 0 0,0 11,19A1,1 0 0,0 12,20A1,1 0 0,0 13,19A1,1 0 0,0 12,18M12,21A1,1 0 0,0 11,22A1,1 0 0,0 12,23A1,1 0 0,0 13,22A1,1 0 0,0 12,21Z" />
    </svg>
  ),
  Usuarios: () => (
    <svg className="icon" viewBox="0 0 24 24">
      <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
    </svg>
  ),
  AuditTrail: () => (
    <svg className="icon" viewBox="0 0 24 24">
      <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" />
    </svg>
  ),
  Bell: () => (
    <svg className="icon" viewBox="0 0 24 24">
      <path d="M12,22A2,2 0 0,0 14,20H10A2,2 0 0,0 12,22M18,16V11C18,7.93 16.36,5.36 13.5,4.68V4A1.5,1.5 0 0,0 12,2.5A1.5,1.5 0 0,0 10.5,4V4.68C7.63,5.36 6,7.92 6,11V16L4,18V19H20V18L18,16Z" />
    </svg>
  ),
  Search: () => (
    <svg className="icon" viewBox="0 0 24 24">
      <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
    </svg>
  ),
  AlertCircle: () => (
    <svg className="icon" viewBox="0 0 24 24">
      <path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M12,4C7.58,4 4,7.58 4,12C4,16.42 7.58,20 12,20C16.42,20 20,16.42 20,12C20,7.58 16.42,4 12,4M12,13A1,1 0 0,1 11,12V8A1,1 0 0,1 12,7A1,1 0 0,1 13,8V12A1,1 0 0,1 12,13M12,17A1.25,1.25 0 1,1 13.25,15.75A1.25,1.25 0 0,1 12,17Z" />
    </svg>
  ),
  XCircle: () => (
    <svg className="icon" viewBox="0 0 24 24">
      <path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" />
    </svg>
  ),
  CheckCircle: () => (
    <svg className="icon" viewBox="0 0 24 24">
      <path d="M12,2C17.52,2 22,6.48 22,12C22,17.52 17.52,22 12,22C6.48,22 2,17.52 2,12C2,6.48 6.48,2 12,2M10,17L18,9L16.59,7.58L10,14.17L7.41,11.59L6,13L10,17Z" />
    </svg>
  ),
  ChevronDown: () => (
    <svg className="icon" viewBox="0 0 24 24">
      <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
    </svg>
  ),
  ChevronRight: () => (
    <svg className="icon" viewBox="0 0 24 24">
      <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
    </svg>
  ),
  LogOut: () => (
    <svg className="icon" viewBox="0 0 24 24">
      <path d="M14.08,15.59L16.67,13H7V11H16.67L14.08,8.41L15.5,7L20.5,12L15.5,17L14.08,15.59M19,3A2,2 0 0,1 21,5V9.67L19,7.67V5H5V19H19V16.33L21,14.33V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H19Z" />
    </svg>
  ),
  Plus: () => (
    <svg className="icon" viewBox="0 0 24 24">
      <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
    </svg>
  ),
  Calendar: () => (
    <svg className="icon" viewBox="0 0 24 24">
      <path d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z" />
    </svg>
  ),
  Eye: () => (
    <svg className="icon" viewBox="0 0 24 24">
      <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17Z" />
    </svg>
  ),
  Edit: () => (
    <svg className="icon" viewBox="0 0 24 24">
      <path d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
    </svg>
  ),
  User: () => (
    <svg className="icon" viewBox="0 0 24 24">
      <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
    </svg>
  )
};

// ==========================================
// 2. MOCK DATASETS
// ==========================================
const INITIAL_FREEZERS = [
  { id: 'FZ-01', serial: 'SN-882910', model: 'TFS-400 Ultra-Low', location: 'Câmara Fria Central A', minSafe: -8.0, maxSafe: -2.0, temp: -5.4, status: 'NORMAL', history: [-5.1, -5.2, -5.4, -5.3, -5.5, -5.6, -5.4, -5.3, -5.4, -5.5, -5.4, -5.4, -5.3, -5.2, -5.4, -5.5, -5.4, -5.6, -5.5, -5.3, -5.4, -5.5, -5.4, -5.4] },
  { id: 'FZ-02', serial: 'SN-492019', model: 'ColdChain Pro 20', location: 'Posto de Saúde 1', minSafe: 2.0, maxSafe: 8.0, temp: 1.2, status: 'ALERTA', history: [4.2, 4.0, 3.8, 3.5, 3.1, 2.8, 2.5, 2.2, 2.0, 1.9, 1.7, 1.5, 1.4, 1.3, 1.2, 1.2, 1.1, 1.2, 1.2, 1.1, 1.2, 1.3, 1.2, 1.2] },
  { id: 'FZ-03', serial: 'SN-102948', model: 'BioStorage 500', location: 'Laboratório de Vacinas B', minSafe: -25.0, maxSafe: -15.0, temp: -19.2, status: 'NORMAL', history: [-18.5, -18.7, -19.0, -19.2, -19.5, -19.4, -19.2, -19.1, -19.3, -19.2, -19.2, -19.3, -19.2, -19.1, -19.2, -19.4, -19.3, -19.2, -19.3, -19.2, -19.2, -19.3, -19.2, -19.2] },
  { id: 'FZ-04', serial: 'SN-302910', model: 'EcoFreezer L3', location: 'Sala de Triagem 3', minSafe: 2.0, maxSafe: 8.0, temp: null, status: 'FALHA DE COMUNICAÇÃO', history: [4.5, 4.4, 4.5, 4.6, 4.5, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null] },
];

const INITIAL_LOTES = [
  { id: 'LT-2026-001', vaccine: 'Influenza Trivalente', supplier: 'Instituto Butantan', freezer: 'SN-882910', expiry: '2026-06-25', qtyInitial: 5000, qtyCurrent: 3420, status: 'DISPONIVEL' },
  { id: 'LT-2026-002', vaccine: 'BCG', supplier: 'Fundação Ataulpho de Paiva', freezer: 'SN-102948', expiry: '2026-09-10', qtyInitial: 2000, qtyCurrent: 1850, status: 'DISPONIVEL' },
  { id: 'LT-2026-003', vaccine: 'Hepatite B', supplier: 'Instituto Butantan', freezer: 'SN-882910', expiry: '2026-05-15', qtyInitial: 3000, qtyCurrent: 200, status: 'EXPIRADO' },
  { id: 'LT-2026-042', vaccine: 'Pentavalente', supplier: 'Serum Institute of India', freezer: 'SN-492019', expiry: '2026-07-01', qtyInitial: 4000, qtyCurrent: 1500, status: 'EM_QUARENTENA' },
  { id: 'LT-2026-055', vaccine: 'Febre Amarela', supplier: 'Bio-Manguinhos', freezer: 'SN-302910', expiry: '2026-08-30', qtyInitial: 6000, qtyCurrent: 4200, status: 'DISPONIVEL' },
  { id: 'LT-2026-077', vaccine: 'Tríplice Viral', supplier: 'Bio-Manguinhos', freezer: 'SN-102948', expiry: '2026-04-01', qtyInitial: 1500, qtyCurrent: 0, status: 'DESCARTADO' },
];

const INITIAL_PACIENTES = [
  { id: 'P-01', name: 'Mariana Costa Oliveira', cpf: '382.491.028-11', birthDate: '1994-08-12', sex: 'Feminino', phone: '(11) 98765-4321', allergies: ['Ovo', 'Neomicina'], notes: 'Gestante no 2º trimestre. Requer atenção redobrada.' },
  { id: 'P-02', name: 'João Victor Silva Santos', cpf: '419.028.391-44', birthDate: '1988-03-24', sex: 'Masculino', phone: '(21) 99876-5432', allergies: [], notes: 'Hipertenso controlado.' },
  { id: 'P-03', name: 'Beatriz Rezende Faria', cpf: '298.112.483-90', birthDate: '2015-11-05', sex: 'Feminino', phone: '(31) 97531-8642', allergies: ['Gelatina'], notes: 'Acompanhada pela mãe. Medo de agulhas.' },
  { id: 'P-04', name: 'Carlos Eduardo Nogueira', cpf: '109.832.748-02', birthDate: '1960-05-18', sex: 'Masculino', phone: '(19) 98456-1234', allergies: [], notes: 'Paciente idoso. Acamado, aplicação residencial solicitada anteriormente.' },
  { id: 'P-05', name: 'Luciana Mello de Souza', cpf: '528.910.243-88', birthDate: '2001-01-30', sex: 'Feminino', phone: '(81) 99122-3344', allergies: [], notes: 'Profissional da saúde.' }
];

const INITIAL_APLICACOES = [
  { id: 'AP-101', patient: 'Mariana Costa Oliveira', patientId: 'P-01', vaccine: 'Influenza Trivalente', lot: 'LT-2026-001', dose: 'Reforço', route: 'Intramuscular', site: 'Deltoide Esquerdo', practitioner: 'Enf. Cleide Souza', date: '2026-06-06 14:30' },
  { id: 'AP-102', patient: 'João Victor Silva Santos', patientId: 'P-02', vaccine: 'Hepatite B', lot: 'LT-2026-003', dose: '1ª Dose', route: 'Intramuscular', site: 'Deltoide Direito', practitioner: 'Enf. Roberto Lima', date: '2026-06-05 09:15' },
  { id: 'AP-103', patient: 'Beatriz Rezende Faria', patientId: 'P-03', vaccine: 'Tríplice Viral', lot: 'LT-2026-077', dose: '1ª Dose', route: 'Subcutânea', site: 'Região Deltoide', practitioner: 'Enf. Cleide Souza', date: '2026-05-28 11:00' },
  { id: 'AP-104', patient: 'Luciana Mello de Souza', patientId: 'P-05', vaccine: 'BCG', lot: 'LT-2026-002', dose: 'Dose Única', route: 'Intradérmica', site: 'Inserção do Deltoide Direito', practitioner: 'Enf. Cleide Souza', date: '2026-06-06 16:45' }
];

const INITIAL_USERS = [
  { id: 'US-01', name: 'Dr. Fernando Albuquerque', email: 'fernando.albuquerque@imuno.gov.br', role: 'QA', lastLogin: '2026-06-06 08:30', status: 'Ativo' },
  { id: 'US-02', name: 'Marta Helena Santos', email: 'marta.santos@imuno.gov.br', role: 'AUDITOR', lastLogin: '2026-06-06 10:12', status: 'Ativo' },
  { id: 'US-03', name: 'Felipe Augusto Castro', email: 'felipe.castro@imuno.gov.br', role: 'OPERADOR', lastLogin: '2026-06-06 19:45', status: 'Ativo' },
  { id: 'US-04', name: 'Juliana Pinho Rezende', email: 'juliana.pinho@imuno.gov.br', role: 'QA', lastLogin: '2026-06-05 14:20', status: 'Inativo' }
];

const INITIAL_AUDIT = [
  { id: 'AUD-501', timestamp: '2026-06-06 19:47:12', user: 'Felipe Augusto Castro', action: 'CREATE_APLICAÇÃO', entity: 'Aplicação', entityId: 'AP-104', prevData: null, newData: { id: 'AP-104', patient: 'Luciana Mello de Souza', vaccine: 'BCG', lot: 'LT-2026-002', dose: 'Dose Única', practitioner: 'Enf. Cleide Souza' } },
  { id: 'AUD-502', timestamp: '2026-06-06 16:32:05', user: 'Dr. Fernando Albuquerque', action: 'UPDATE_LOTE_STATUS', entity: 'Lote', entityId: 'LT-2026-042', prevData: { id: 'LT-2026-042', status: 'DISPONIVEL' }, newData: { id: 'LT-2026-042', status: 'EM_QUARENTENA', reason: 'Oscilação térmica registrada no Freezer SN-492019' } },
  { id: 'AUD-503', timestamp: '2026-06-05 11:20:00', user: 'Juliana Pinho Rezende', action: 'UPDATE_FREEZER', entity: 'Freezer', entityId: 'SN-492019', prevData: { location: 'Sala de Triagem 1' }, newData: { location: 'Posto de Saúde 1' } }
];

const ALERT_ITEMS = [
  { id: 'AL-01', level: 'danger', freezer: 'SN-492019', name: 'ColdChain Pro 20', temp: '1.2°C', range: '2.0°C a 8.0°C', timeAgo: '12 min atrás' },
  { id: 'AL-02', level: 'warning', freezer: 'SN-302910', name: 'EcoFreezer L3', temp: 'Sem comunicação', range: '2.0°C a 8.0°C', timeAgo: '45 min atrás' }
];

const VACCINES_LIST = [
  'Influenza Trivalente',
  'BCG',
  'Hepatite B',
  'Pentavalente',
  'VIP/VOP',
  'Febre Amarela',
  'Tríplice Viral'
];

const SUPPLIERS_LIST = [
  'Instituto Butantan',
  'Fundação Ataulpho de Paiva',
  'Bio-Manguinhos',
  'Serum Institute of India'
];

function App() {
  // ==========================================
  // 3. MAIN STATE MANAGEMENT
  // ==========================================
  const [currentUserRole, setCurrentUserRole] = useState('QA'); // Options: OPERADOR, QA, AUDITOR
  const [activeScreen, setActiveScreen] = useState('dashboard'); // Screens: login, dashboard, freezers, freezerDetail, lotes, pacientes, pacienteDetail, usuarios, auditTrail
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  // App Lists
  const [freezers] = useState(INITIAL_FREEZERS);
  const [lotes, setLotes] = useState(INITIAL_LOTES);
  const [pacientes] = useState(INITIAL_PACIENTES);
  const [aplicacoes, setAplicacoes] = useState(INITIAL_APLICACOES);
  const [usuarios] = useState(INITIAL_USERS);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT);
  const [alertList] = useState(ALERT_ITEMS);

  // Simulation Controls
  const [isSkeletonActive, setIsSkeletonActive] = useState(false);
  const [isEmptyStateActive, setIsEmptyStateActive] = useState(false);

  // Selected Detail items
  const [selectedFreezerSerial, setSelectedFreezerSerial] = useState('SN-882910');
  const [selectedPatientId, setSelectedPatientId] = useState('P-01');

  // Table configurations (sorting & pagination)
  const [tablePageSizes, setTablePageSizes] = useState({
    freezers: 10,
    lotes: 10,
    pacientes: 10,
    aplicacoes: 10,
    usuarios: 10,
    auditTrail: 10
  });

  const [tableCurrentPages, setTableCurrentPages] = useState({
    freezers: 1,
    lotes: 1,
    pacientes: 1,
    aplicacoes: 1,
    usuarios: 1,
    auditTrail: 1
  });

  const [tableSortConfigs, setTableSortConfigs] = useState({
    freezers: { key: 'id', direction: 'asc' },
    lotes: { key: 'expiry', direction: 'asc' },
    pacientes: { key: 'name', direction: 'asc' },
    aplicacoes: { key: 'date', direction: 'desc' },
    usuarios: { key: 'name', direction: 'asc' },
    auditTrail: { key: 'timestamp', direction: 'desc' }
  });

  // Table Search and filters
  const [filters, setFilters] = useState({
    freezers: { search: '', status: 'Todos' },
    lotes: { search: '', status: 'Todos', vaccine: 'Todos' },
    pacientes: { search: '' },
    auditTrail: { user: 'Todos', action: 'Todos' }
  });

  // Modals state
  const [modals, setModals] = useState({
    lote: false,
    aplicacao: false,
    critical: false
  });

  // Form Fields
  const [loteForm, setLoteForm] = useState({
    id: '', vaccine: '', supplier: '', freezer: '', expiry: '', qtyInitial: ''
  });

  const [aplicacaoForm, setAplicacaoForm] = useState({
    patientName: '', patientId: '', searchInput: '', vaccine: '', lot: '', dose: '1ª Dose', route: 'Intramuscular', site: '', notes: ''
  });

  const [criticalActionForm, setCriticalActionForm] = useState({
    actionType: '', // 'RELEASE_QUARANTINE' or 'DISCARD_LOTE' or 'DELETE_USER'
    targetId: '',
    description: '',
    myPassword: '',
    supervisorPassword: '',
    errorMsg: ''
  });

  // Auto-complete suggestions for patient field
  const [patientSuggestions, setPatientSuggestions] = useState([]);

  // Detail view tab index
  const [freezerDetailTab, setFreezerDetailTab] = useState('temperatura'); // 'temperatura' or 'lotes'

  // Audit view expanded rows
  const [expandedAuditRows, setExpandedAuditRows] = useState({});

  // ==========================================
  // 4. ACTION HANDLERS
  // ==========================================
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setActiveScreen('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveScreen('login');
  };

  const navigateTo = (screen, contextId = null) => {
    if (screen === 'freezerDetail') {
      setSelectedFreezerSerial(contextId);
    } else if (screen === 'pacienteDetail') {
      setSelectedPatientId(contextId);
    }
    setActiveScreen(screen);
    setTableCurrentPages(prev => ({ ...prev, [screen]: 1 }));
  };

  // Sorting Handler
  const handleSort = (tableKey, columnKey) => {
    setTableSortConfigs(prev => {
      const current = prev[tableKey];
      const direction = (current.key === columnKey && current.direction === 'asc') ? 'desc' : 'asc';
      return {
        ...prev,
        [tableKey]: { key: columnKey, direction }
      };
    });
  };

  // Safe Sorter Utility
  const sortData = (data, config) => {
    if (!config.key) return data;
    const sorted = [...data];
    sorted.sort((a, b) => {
      let valA = a[config.key];
      let valB = b[config.key];
      if (valA === null || valA === undefined) return 1;
      if (valB === null || valB === undefined) return -1;

      if (typeof valA === 'string') {
        return config.direction === 'asc' 
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      } else {
        return config.direction === 'asc' ? valA - valB : valB - valA;
      }
    });
    return sorted;
  };

  // Page limit size handler
  const handlePageSizeChange = (tableKey, size) => {
    setTablePageSizes(prev => ({ ...prev, [tableKey]: size }));
    setTableCurrentPages(prev => ({ ...prev, [tableKey]: 1 }));
  };

  // Page navigation
  const handlePageChange = (tableKey, page) => {
    setTableCurrentPages(prev => ({ ...prev, [tableKey]: page }));
  };

  // Filter setters
  const handleFilterChange = (tableKey, key, value) => {
    setFilters(prev => ({
      ...prev,
      [tableKey]: {
        ...prev[tableKey],
        [key]: value
      }
    }));
    setTableCurrentPages(prev => ({ ...prev, [tableKey]: 1 }));
  };

  // Audit expanding toggler
  const toggleAuditExpand = (id) => {
    setExpandedAuditRows(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // --- Modal Form Actions ---
  const handleOpenLoteModal = () => {
    setLoteForm({ id: '', vaccine: VACCINES_LIST[0], supplier: SUPPLIERS_LIST[0], freezer: freezers[0].serial, expiry: '', qtyInitial: '' });
    setModals(prev => ({ ...prev, lote: true }));
  };

  const handleSaveLote = (e) => {
    e.preventDefault();
    // Validate
    if (!loteForm.id || !loteForm.expiry || !loteForm.qtyInitial) {
      alert("Por favor preencha todos os campos obrigatórios.");
      return;
    }
    const qty = parseInt(loteForm.qtyInitial);
    if (isNaN(qty) || qty <= 0) {
      alert("A quantidade inicial deve ser maior que zero.");
      return;
    }

    const newLote = {
      id: loteForm.id.toUpperCase(),
      vaccine: loteForm.vaccine,
      supplier: loteForm.supplier,
      freezer: loteForm.freezer,
      expiry: loteForm.expiry,
      qtyInitial: qty,
      qtyCurrent: qty,
      status: 'DISPONIVEL'
    };

    setLotes(prev => [newLote, ...prev]);
    setModals(prev => ({ ...prev, lote: false }));

    // Log to Audit Trail
    const newAudit = {
      id: `AUD-${Math.floor(600 + Math.random() * 400)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: currentUserRole === 'QA' ? 'Dr. Fernando Albuquerque' : currentUserRole === 'AUDITOR' ? 'Marta Helena Santos' : 'Felipe Augusto Castro',
      action: 'CREATE_LOTE',
      entity: 'Lote',
      entityId: newLote.id,
      prevData: null,
      newData: newLote
    };
    setAuditLogs(prev => [newAudit, ...prev]);
  };

  // Autocomplete patient field
  const handlePatientSearchChange = (val) => {
    setAplicacaoForm(prev => ({ ...prev, searchInput: val }));
    if (val.trim().length > 1) {
      const filtered = pacientes.filter(p => p.name.toLowerCase().includes(val.toLowerCase()) || p.cpf.includes(val));
      setPatientSuggestions(filtered);
    } else {
      setPatientSuggestions([]);
    }
  };

  const selectPatientSuggestion = (patient) => {
    setAplicacaoForm(prev => ({
      ...prev,
      searchInput: patient.name,
      patientName: patient.name,
      patientId: patient.id
    }));
    setPatientSuggestions([]);
  };

  const handleOpenAplicacaoModal = () => {
    setAplicacaoForm({
      patientName: '',
      patientId: '',
      searchInput: '',
      vaccine: VACCINES_LIST[0],
      lot: '',
      dose: '1ª Dose',
      route: 'Intramuscular',
      site: '',
      notes: ''
    });
    setModals(prev => ({ ...prev, aplicacao: true }));
  };

  // FEFO (First Expired First Out) active lot calculation for chosen vaccine
  const suggestedLotForVaccine = useMemo(() => {
    const selectedVaccine = aplicacaoForm.vaccine;
    if (!selectedVaccine) return null;
    
    // Find active lots for this vaccine
    const availableLots = lotes.filter(l => l.vaccine === selectedVaccine && l.status === 'DISPONIVEL' && l.qtyCurrent > 0);
    if (availableLots.length === 0) return null;

    // Sort by expiration (earliest first)
    availableLots.sort((a, b) => new Date(a.expiry) - new Date(b.expiry));
    return availableLots[0];
  }, [lotes, aplicacaoForm.vaccine]);

  const handleSaveAplicacao = (e) => {
    e.preventDefault();
    const activeLotId = aplicacaoForm.lot || (suggestedLotForVaccine ? suggestedLotForVaccine.id : '');
    
    if (!aplicacaoForm.patientId) {
      alert("Por favor selecione um paciente cadastrado.");
      return;
    }
    if (!aplicacaoForm.vaccine) {
      alert("Por favor selecione uma vacina.");
      return;
    }
    if (!activeLotId) {
      alert("Não há lotes válidos disponíveis para esta vacina.");
      return;
    }

    // Deduct quantity from lot
    const lotIndex = lotes.findIndex(l => l.id === activeLotId);
    if (lotIndex !== -1) {
      if (lotes[lotIndex].qtyCurrent <= 0) {
        alert("O lote selecionado não possui saldo disponível.");
        return;
      }
      const updatedLotes = [...lotes];
      updatedLotes[lotIndex].qtyCurrent -= 1;
      setLotes(updatedLotes);
    }

    const newApp = {
      id: `AP-${Math.floor(105 + Math.random() * 900)}`,
      patient: aplicacaoForm.patientName,
      patientId: aplicacaoForm.patientId,
      vaccine: aplicacaoForm.vaccine,
      lot: activeLotId,
      dose: aplicacaoForm.dose,
      route: aplicacaoForm.route,
      site: aplicacaoForm.site || 'Não especificado',
      practitioner: currentUserRole === 'QA' ? 'Dr. Fernando Albuquerque' : 'Enf. Cleide Souza',
      date: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    setAplicacoes(prev => [newApp, ...prev]);
    setModals(prev => ({ ...prev, aplicacao: false }));

    // Log to Audit Trail
    const newAudit = {
      id: `AUD-${Math.floor(600 + Math.random() * 400)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: currentUserRole === 'QA' ? 'Dr. Fernando Albuquerque' : currentUserRole === 'AUDITOR' ? 'Marta Helena Santos' : 'Felipe Augusto Castro',
      action: 'CREATE_APLICAÇÃO',
      entity: 'Aplicação',
      entityId: newApp.id,
      prevData: null,
      newData: newApp
    };
    setAuditLogs(prev => [newAudit, ...prev]);
  };

  // --- Critical Action Dual Authentication Modal Actions ---
  const triggerCriticalAction = (type, targetId, desc) => {
    setCriticalActionForm({
      actionType: type,
      targetId: targetId,
      description: desc,
      myPassword: '',
      supervisorPassword: '',
      errorMsg: ''
    });
    setModals(prev => ({ ...prev, critical: true }));
  };

  const handleConfirmCriticalAction = (e) => {
    e.preventDefault();
    const { actionType, targetId, myPassword, supervisorPassword } = criticalActionForm;

    // Simulate validation
    if (!myPassword || !supervisorPassword) {
      setCriticalActionForm(prev => ({ ...prev, errorMsg: 'Ambas as senhas são de preenchimento obrigatório.' }));
      return;
    }
    // Hardcoded sandbox passwords to enable easy verification
    if (myPassword !== '123' || supervisorPassword !== 'qa123') {
      setCriticalActionForm(prev => ({ ...prev, errorMsg: 'Credenciais inválidas. Use "123" para sua senha e "qa123" para senha do supervisor QA.' }));
      return;
    }

    // Excedeed password check. Perform critical modification
    if (actionType === 'QUARANTINE_RELEASE') {
      const lotIndex = lotes.findIndex(l => l.id === targetId);
      if (lotIndex !== -1) {
        const oldLote = { ...lotes[lotIndex] };
        const updated = [...lotes];
        updated[lotIndex].status = 'DISPONIVEL';
        setLotes(updated);

        // Audit log
        const audit = {
          id: `AUD-${Math.floor(600 + Math.random() * 400)}`,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
          user: 'Dr. Fernando Albuquerque (QA Approved)',
          action: 'RELEASE_QUARANTINE',
          entity: 'Lote',
          entityId: targetId,
          prevData: oldLote,
          newData: updated[lotIndex]
        };
        setAuditLogs(prev => [audit, ...prev]);
      }
    } else if (actionType === 'DISCARD_LOTE') {
      const lotIndex = lotes.findIndex(l => l.id === targetId);
      if (lotIndex !== -1) {
        const oldLote = { ...lotes[lotIndex] };
        const updated = [...lotes];
        updated[lotIndex].status = 'DESCARTADO';
        setLotes(updated);

        // Audit log
        const audit = {
          id: `AUD-${Math.floor(600 + Math.random() * 400)}`,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
          user: 'Dr. Fernando Albuquerque (QA Approved)',
          action: 'DISCARD_LOTE',
          entity: 'Lote',
          entityId: targetId,
          prevData: oldLote,
          newData: updated[lotIndex]
        };
        setAuditLogs(prev => [audit, ...prev]);
      }
    } else if (actionType === 'PUT_IN_QUARANTINE') {
      const lotIndex = lotes.findIndex(l => l.id === targetId);
      if (lotIndex !== -1) {
        const oldLote = { ...lotes[lotIndex] };
        const updated = [...lotes];
        updated[lotIndex].status = 'EM_QUARENTENA';
        setLotes(updated);

        // Audit log
        const audit = {
          id: `AUD-${Math.floor(600 + Math.random() * 400)}`,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
          user: 'Dr. Fernando Albuquerque (QA Approved)',
          action: 'QUARANTINE_LOTE',
          entity: 'Lote',
          entityId: targetId,
          prevData: oldLote,
          newData: updated[lotIndex]
        };
        setAuditLogs(prev => [audit, ...prev]);
      }
    }

    setModals(prev => ({ ...prev, critical: false }));
  };

  // ==========================================
  // 5. MEMOIZED FILTERED DATASETS
  // ==========================================
  
  // Freezers table computation
  const computedFreezers = useMemo(() => {
    let list = freezers;
    if (filters.freezers.status !== 'Todos') {
      list = list.filter(f => f.status === filters.freezers.status);
    }
    if (filters.freezers.search.trim()) {
      const query = filters.freezers.search.toLowerCase();
      list = list.filter(f => 
        f.serial.toLowerCase().includes(query) || 
        f.model.toLowerCase().includes(query) || 
        f.location.toLowerCase().includes(query)
      );
    }
    return sortData(list, tableSortConfigs.freezers);
  }, [freezers, filters.freezers, tableSortConfigs.freezers]);

  // Lotes table computation
  const computedLotes = useMemo(() => {
    let list = lotes;
    if (filters.lotes.status !== 'Todos') {
      list = list.filter(l => l.status === filters.lotes.status);
    }
    if (filters.lotes.vaccine !== 'Todos') {
      list = list.filter(l => l.vaccine === filters.lotes.vaccine);
    }
    if (filters.lotes.search.trim()) {
      const query = filters.lotes.search.toLowerCase();
      list = list.filter(l => 
        l.id.toLowerCase().includes(query) || 
        l.supplier.toLowerCase().includes(query) || 
        l.freezer.toLowerCase().includes(query)
      );
    }
    return sortData(list, tableSortConfigs.lotes);
  }, [lotes, filters.lotes, tableSortConfigs.lotes]);

  // Pacientes table computation
  const computedPacientes = useMemo(() => {
    let list = pacientes;
    if (filters.pacientes.search.trim()) {
      const query = filters.pacientes.search.toLowerCase();
      list = list.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.cpf.includes(query)
      );
    }
    return sortData(list, tableSortConfigs.pacientes);
  }, [pacientes, filters.pacientes, tableSortConfigs.pacientes]);

  // Audit Logs table computation
  const computedAuditLogs = useMemo(() => {
    let list = auditLogs;
    if (filters.auditTrail.user !== 'Todos') {
      list = list.filter(a => a.user === filters.auditTrail.user);
    }
    if (filters.auditTrail.action !== 'Todos') {
      list = list.filter(a => a.action === filters.auditTrail.action);
    }
    return sortData(list, tableSortConfigs.auditTrail);
  }, [auditLogs, filters.auditTrail, tableSortConfigs.auditTrail]);

  // ==========================================
  // 6. SCREEN RENDERERS
  // ==========================================

  // KPI Calculations
  const kpiStats = useMemo(() => {
    // Total lotes ativos (Status = DISPONIVEL)
    const activeLotes = lotes.filter(l => l.status === 'DISPONIVEL').length;
    // Freezers em alerta
    const alertFreezers = freezers.filter(f => f.status === 'ALERTA' || f.status === 'FALHA DE COMUNICAÇÃO').length;
    // Aplicações Hoje (records created with today's date)
    const todayStr = '2026-06-06';
    const applicationsToday = aplicacoes.filter(a => a.date.startsWith(todayStr)).length;
    // Lotes vencendo em 30 dias (expiry between June 6, 2026 and July 6, 2026)
    const todayDate = new Date('2026-06-06');
    const limitDate = new Date('2026-07-06');
    const expiringSoon = lotes.filter(l => {
      const exp = new Date(l.expiry);
      return l.status === 'DISPONIVEL' && exp >= todayDate && exp <= limitDate;
    }).length;

    return { activeLotes, alertFreezers, applicationsToday, expiringSoon };
  }, [lotes, freezers, aplicacoes]);

  // Status Badge Component Generator
  const renderStatusBadge = (status) => {
    switch(status.toUpperCase()) {
      case 'NORMAL':
      case 'DISPONIVEL':
      case 'ATIVO':
        return <span className="badge badge-success"><Icons.CheckCircle /> {status}</span>;
      case 'ALERTA':
      case 'EM_QUARENTENA':
        return <span className="badge badge-warning"><Icons.AlertCircle /> {status.replace('_', ' ')}</span>;
      case 'FALHA DE COMUNICAÇÃO':
      case 'EXPIRADO':
      case 'FALHA':
        return <span className="badge badge-danger"><Icons.XCircle /> {status}</span>;
      case 'DESCARTADO':
      case 'INATIVO':
        return <span className="badge badge-secondary">{status}</span>;
      default:
        return <span className="badge badge-secondary">{status}</span>;
    }
  };

  // Loading skeleton layout generator
  const renderSkeletonTable = (rows = 5, cols = 5) => {
    return (
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              {Array.from({ length: cols }).map((_, i) => (
                <th key={i}><div className="skeleton" style={{ height: '14px', width: '80px' }} /></th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, r) => (
              <tr key={r}>
                {Array.from({ length: cols }).map((_, c) => (
                  <td key={c}><div className="skeleton" style={{ height: '14px', width: c === 0 ? '120px' : '70px' }} /></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Empty State Generator
  const renderEmptyState = (title, desc) => {
    return (
      <div className="empty-state">
        <div className="empty-state-svg">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.008 1.24l.885 1.77a2.25 2.25 0 0 0 2.007 1.24h1.98a2.25 2.25 0 0 0 2.007-1.24l.885-1.77a2.25 2.25 0 0 1 2.007-1.24h3.86m-18 0h18" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 8.25V19.5a2.25 2.25 0 0 1-2.25 2.25H7.5A2.25 2.25 0 0 1 5.25 19.5V8.25m13.5 0V9a2.25 2.25 0 0 1-2.25 2.25H7.5A2.25 2.25 0 0 1 5.25 9V8.25m13.5 0A2.25 2.25 0 0 0 16.5 6H7.5A2.25 2.25 0 0 0 5.25 8.25" />
          </svg>
        </div>
        <div className="empty-state-title">{title}</div>
        <div className="empty-state-desc">{desc}</div>
      </div>
    );
  };

  // Table generic paginator controls
  const renderPaginator = (tableKey, totalItems, currentPage, pageSize) => {
    const totalPages = Math.ceil(totalItems / pageSize) || 1;
    const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);

    return (
      <div className="pagination-container">
        <div className="pagination-sizes">
          Visualizar: 
          <select 
            className="simulation-select" 
            style={{ marginLeft: '6px', color: '#161616', backgroundColor: '#fff', border: '1px solid #ccc' }}
            value={pageSize}
            onChange={(e) => handlePageSizeChange(tableKey, parseInt(e.target.value))}
          >
            <option value={10}>10 por página</option>
            <option value={25}>25 por página</option>
            <option value={50}>50 por página</option>
          </select>
        </div>
        <div>
          Exibindo {startItem}-{endItem} de {totalItems} registros
        </div>
        <div className="pagination-controls">
          <button 
            className="btn btn-secondary btn-sm"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(tableKey, currentPage - 1)}
          >
            Anterior
          </button>
          <button 
            className="btn btn-secondary btn-sm"
            style={{ marginLeft: '4px' }}
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(tableKey, currentPage + 1)}
          >
            Próximo
          </button>
        </div>
      </div>
    );
  };

  // SVG Native Temperature Chart Drawer
  const renderTemperatureChart = (history, minSafe, maxSafe) => {
    // History points: 24 readings
    // Map them into SVG coordinates (width 700, height 200)
    const width = 740;
    const height = 200;
    const paddingLeft = 40;
    const paddingRight = 20;
    const paddingTop = 20;
    const paddingBottom = 30;

    // Filter out nulls for calculation
    const validReadings = history.filter(v => v !== null);
    if (validReadings.length === 0) {
      return (
        <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fafafa', border: '1px solid #e0e0e0', color: '#8d8d8d' }}>
          Sem dados de temperatura históricos disponíveis para o período de 24h.
        </div>
      );
    }

    const maxTemp = Math.max(...validReadings, maxSafe) + 2.0;
    const minTemp = Math.min(...validReadings, minSafe) - 2.0;
    const tempRange = maxTemp - minTemp;

    // Mapping formulas
    const getX = (index) => paddingLeft + (index / (history.length - 1)) * (width - paddingLeft - paddingRight);
    const getY = (val) => {
      if (val === null) return height - paddingBottom;
      return paddingTop + ((maxTemp - val) / tempRange) * (height - paddingTop - paddingBottom);
    };

    // Safe lines
    const maxSafeY = getY(maxSafe);
    const minSafeY = getY(minSafe);

    // Draw line points
    let points = [];
    history.forEach((val, i) => {
      if (val !== null) {
        points.push(`${getX(i)},${getY(val)}`);
      }
    });
    const pointsStr = points.join(' ');

    return (
      <div style={{ backgroundColor: '#ffffff', padding: '12px', border: '1px solid #e0e0e0', borderRadius: '4px' }}>
        <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="220" style={{ overflow: 'visible' }}>
          {/* Grid lines */}
          <line x1={paddingLeft} y1={paddingTop} x2={width - paddingRight} y2={paddingTop} stroke="#f0f0f0" />
          <line x1={paddingLeft} y1={(height - paddingBottom + paddingTop) / 2} x2={width - paddingRight} y2={(height - paddingBottom + paddingTop) / 2} stroke="#f0f0f0" />
          <line x1={paddingLeft} y1={height - paddingBottom} x2={width - paddingRight} y2={height - paddingBottom} stroke="#f0f0f0" />

          {/* Left Y Axis Labels */}
          <text x={paddingLeft - 10} y={paddingTop + 4} textAnchor="end" fontSize="10" fill="#525252">{maxTemp.toFixed(1)}°C</text>
          <text x={paddingLeft - 10} y={(height - paddingBottom + paddingTop) / 2 + 4} textAnchor="end" fontSize="10" fill="#525252">{((maxTemp + minTemp) / 2).toFixed(1)}°C</text>
          <text x={paddingLeft - 10} y={height - paddingBottom + 4} textAnchor="end" fontSize="10" fill="#525252">{minTemp.toFixed(1)}°C</text>

          {/* Safe Range Red Lines */}
          <line x1={paddingLeft} y1={maxSafeY} x2={width - paddingRight} y2={maxSafeY} stroke="#da1e28" strokeDasharray="4,4" strokeWidth="1.5" />
          <text x={width - paddingRight + 5} y={maxSafeY + 3} fontSize="10" fill="#da1e28" fontWeight="600">Max Limite ({maxSafe.toFixed(1)}°C)</text>
          
          <line x1={paddingLeft} y1={minSafeY} x2={width - paddingRight} y2={minSafeY} stroke="#da1e28" strokeDasharray="4,4" strokeWidth="1.5" />
          <text x={width - paddingRight + 5} y={minSafeY + 3} fontSize="10" fill="#da1e28" fontWeight="600">Min Limite ({minSafe.toFixed(1)}°C)</text>

          {/* Path of temperature points */}
          <polyline fill="none" stroke="#0f62fe" strokeWidth="2" points={pointsStr} />

          {/* Data Circles */}
          {history.map((val, i) => {
            if (val === null) return null;
            const cx = getX(i);
            const cy = getY(val);
            const isOut = val > maxSafe || val < minSafe;
            return (
              <g key={i}>
                <circle cx={cx} cy={cy} r={isOut ? "4" : "3"} fill={isOut ? "#da1e28" : "#0f62fe"} stroke="#ffffff" strokeWidth="1" />
                {/* Visual value on every 3rd step or edge points */}
                {(i % 4 === 0 || i === history.length - 1) && (
                  <text x={cx} y={cy - 8} textAnchor="middle" fontSize="9" fontWeight="600" fill={isOut ? "#da1e28" : "#161616"}>
                    {val.toFixed(1)}°
                  </text>
                )}
              </g>
            );
          })}

          {/* X Axis ticks */}
          <text x={paddingLeft} y={height - paddingBottom + 16} textAnchor="middle" fontSize="9" fill="#8d8d8d">24h atrás</text>
          <text x={paddingLeft + (width - paddingLeft - paddingRight) / 2} y={height - paddingBottom + 16} textAnchor="middle" fontSize="9" fill="#8d8d8d">12h atrás</text>
          <text x={width - paddingRight} y={height - paddingBottom + 16} textAnchor="middle" fontSize="9" fill="#8d8d8d">Agora</text>
        </svg>
      </div>
    );
  };

  // SCREEN 1: LOGIN SCREEN
  if (!isLoggedIn || activeScreen === 'login') {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-logo-container">
            <div style={{ color: '#0F62FE', marginBottom: '8px' }}>
              <svg style={{ width: '48px', height: '48px', fill: 'currentColor' }} viewBox="0 0 24 24">
                <path d="M19 3H14.82C14.4 1.84 13.3 1 12 1S9.6 1.84 9.18 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M12 3C12.55 3 13 3.45 13 4S12.55 5 12 5 11 4.55 11 4 11.45 3 12 3M17 18H7V17H17V18M10.3 14.7L9 16H7V14L8.3 12.7C8.1 12.1 8 11.6 8 11C8 8.8 9.8 7 12 7C12.6 7 13.1 7.1 13.7 7.3L12 9H14V11H12.3L15.3 14H17V12.3L18.7 14C18.9 14.6 19 15.1 19 15.7C19 17.9 17.2 19.7 15 19.7C14.4 19.7 13.9 19.6 13.3 19.4L12 20.7H10V18.7L11.3 17.4C10.9 16.6 10.5 15.7 10.3 14.7Z"/>
              </svg>
            </div>
            <div className="login-logo-text">ImunoPanel</div>
            <div className="login-logo-sub">Controle de Imunobiológicos & Cadeia de Frio</div>
          </div>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">E-mail Corporativo</label>
              <input 
                type="email" 
                className="form-control" 
                placeholder="exemplo@imuno.gov.br" 
                defaultValue="operador@imuno.gov.br"
                required 
              />
            </div>
            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label className="form-label">Senha</label>
              <input 
                type="password" 
                className="form-control" 
                placeholder="••••••••" 
                defaultValue="password123"
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '10px' }}>
              Entrar
            </button>
          </form>

          {/* Quick Profiles Selector */}
          <div style={{ marginTop: '20px', borderTop: '1px solid #E0E0E0', paddingTop: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: '600', color: '#525252', marginBottom: '8px', textTransform: 'uppercase', textAlign: 'center' }}>
              Sandbox - Login Automático
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px' }}>
              <button className="btn btn-secondary btn-sm" onClick={() => { setCurrentUserRole('OPERADOR'); setIsLoggedIn(true); setActiveScreen('dashboard'); }}>Operador</button>
              <button className="btn btn-secondary btn-sm" onClick={() => { setCurrentUserRole('QA'); setIsLoggedIn(true); setActiveScreen('dashboard'); }}>Supervisor QA</button>
              <button className="btn btn-secondary btn-sm" onClick={() => { setCurrentUserRole('AUDITOR'); setIsLoggedIn(true); setActiveScreen('dashboard'); }}>Auditor</button>
            </div>
          </div>

          <div className="login-footer">
            Sistema interno de controle de imunobiológicos
          </div>
        </div>
      </div>
    );
  }

  // Active logged-in user profile configs
  const currentUserDetail = {
    name: currentUserRole === 'QA' ? 'Dr. Fernando Albuquerque' : currentUserRole === 'AUDITOR' ? 'Marta Helena Santos' : 'Felipe Augusto Castro',
    avatar: currentUserRole === 'QA' ? 'FA' : currentUserRole === 'AUDITOR' ? 'MS' : 'FC',
    email: currentUserRole === 'QA' ? 'fernando.albuquerque@imuno.gov.br' : currentUserRole === 'AUDITOR' ? 'marta.santos@imuno.gov.br' : 'felipe.castro@imuno.gov.br'
  };

  return (
    <div className="app-container">
      {/* ==========================================
          SIDEBAR NAVIGATION (Collapsed / Expanded)
          ========================================== */}
      <aside className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-toggle-btn" onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}>
          {isSidebarCollapsed ? <Icons.ChevronRight /> : <Icons.ChevronDown style={{ transform: 'rotate(90deg)' }} />}
        </div>
        
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <Icons.Syringe />
          </div>
          {!isSidebarCollapsed && <span style={{ marginLeft: '4px' }}>ImunoPanel</span>}
        </div>

        <nav className="sidebar-nav">
          <div 
            className={`sidebar-nav-item ${activeScreen === 'dashboard' ? 'active' : ''}`}
            onClick={() => navigateTo('dashboard')}
          >
            <Icons.Dashboard />
            {!isSidebarCollapsed && <span>Dashboard</span>}
          </div>
          
          <div 
            className={`sidebar-nav-item ${activeScreen === 'freezers' || activeScreen === 'freezerDetail' ? 'active' : ''}`}
            onClick={() => navigateTo('freezers')}
          >
            <Icons.Freezers />
            {!isSidebarCollapsed && <span>Freezers</span>}
          </div>

          <div 
            className={`sidebar-nav-item ${activeScreen === 'lotes' ? 'active' : ''}`}
            onClick={() => navigateTo('lotes')}
          >
            <Icons.Lotes />
            {!isSidebarCollapsed && <span>Lotes</span>}
          </div>

          <div 
            className={`sidebar-nav-item ${activeScreen === 'pacientes' || activeScreen === 'pacienteDetail' ? 'active' : ''}`}
            onClick={() => navigateTo('pacientes')}
          >
            <Icons.Pacientes />
            {!isSidebarCollapsed && <span>Pacientes</span>}
          </div>

          {/* QA profile restricted screens (Usuários is visible to QA/ADMIN, Audit Trail to Auditor) */}
          {(currentUserRole === 'QA') && (
            <div 
              className={`sidebar-nav-item ${activeScreen === 'usuarios' ? 'active' : ''}`}
              onClick={() => navigateTo('usuarios')}
            >
              <Icons.Usuarios />
              {!isSidebarCollapsed && <span>Usuários</span>}
            </div>
          )}

          {(currentUserRole === 'AUDITOR') && (
            <div 
              className={`sidebar-nav-item ${activeScreen === 'auditTrail' ? 'active' : ''}`}
              onClick={() => navigateTo('auditTrail')}
            >
              <Icons.AuditTrail />
              {!isSidebarCollapsed && <span>Audit Trail</span>}
            </div>
          )}
        </nav>

        {/* Sidebar user footer */}
        <div className="sidebar-footer">
          <div className="sidebar-user-avatar" title={currentUserDetail.email}>
            {currentUserDetail.avatar}
          </div>
          {!isSidebarCollapsed && (
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{currentUserDetail.name}</div>
              <div className="sidebar-user-role">{currentUserRole}</div>
            </div>
          )}
          <button className="sidebar-logout-btn" title="Fazer Logout" onClick={handleLogout}>
            <Icons.LogOut />
          </button>
        </div>
      </aside>

      {/* ==========================================
          MAIN WORKSPACE
          ========================================== */}
      <div className="main-workspace">
        {/* Sandbox Simulation Header */}
        <div className="simulation-bar">
          <div>
            <strong>SANDBOX CONTROLS:</strong> Simulador de Perfil e Estado de Teste
          </div>
          <div className="simulation-controls">
            <div>
              <label style={{ marginRight: '6px' }}>Perfil Ativo:</label>
              <select 
                className="simulation-select"
                value={currentUserRole}
                onChange={(e) => {
                  setCurrentUserRole(e.target.value);
                  // Auto reroute if restricted screen is active
                  if (e.target.value !== 'QA' && activeScreen === 'usuarios') setActiveScreen('dashboard');
                  if (e.target.value !== 'AUDITOR' && activeScreen === 'auditTrail') setActiveScreen('dashboard');
                }}
              >
                <option value="OPERADOR">OPERADOR</option>
                <option value="QA">QA (Supervisor)</option>
                <option value="AUDITOR">AUDITOR (Somente Leitura + Logs)</option>
              </select>
            </div>

            <button 
              className="btn btn-secondary btn-sm" 
              style={{ padding: '2px 8px', fontSize: '11px', color: '#fff', backgroundColor: isSkeletonActive ? '#DA1E28' : '#353535', borderColor: '#555' }}
              onClick={() => setIsSkeletonActive(!isSkeletonActive)}
            >
              {isSkeletonActive ? 'Desativar Skeleton' : 'Simular Skeleton'}
            </button>

            <button 
              className="btn btn-secondary btn-sm" 
              style={{ padding: '2px 8px', fontSize: '11px', color: '#fff', backgroundColor: isEmptyStateActive ? '#DA1E28' : '#353535', borderColor: '#555' }}
              onClick={() => setIsEmptyStateActive(!isEmptyStateActive)}
            >
              {isEmptyStateActive ? 'Desativar Estado Vazio' : 'Simular Estado Vazio'}
            </button>
          </div>
        </div>

        {/* Top Navbar */}
        <header className="top-bar">
          <div className="top-bar-left">
            {/* Dynamic Breadcrumbs */}
            <div className="breadcrumb">
              <span className="breadcrumb-link" onClick={() => navigateTo('dashboard')}>ImunoPanel</span>
              
              {activeScreen === 'dashboard' && (
                <span className="breadcrumb-active">Dashboard</span>
              )}

              {(activeScreen === 'freezers' || activeScreen === 'freezerDetail') && (
                <>
                  <span className={`breadcrumb-link ${activeScreen === 'freezers' ? 'breadcrumb-active' : ''}`} onClick={() => navigateTo('freezers')}>Freezers</span>
                  {activeScreen === 'freezerDetail' && (
                    <span className="breadcrumb-active">{selectedFreezerSerial}</span>
                  )}
                </>
              )}

              {activeScreen === 'lotes' && (
                <span className="breadcrumb-active">Lotes</span>
              )}

              {(activeScreen === 'pacientes' || activeScreen === 'pacienteDetail') && (
                <>
                  <span className={`breadcrumb-link ${activeScreen === 'pacientes' ? 'breadcrumb-active' : ''}`} onClick={() => navigateTo('pacientes')}>Pacientes</span>
                  {activeScreen === 'pacienteDetail' && (
                    <span className="breadcrumb-active">
                      {pacientes.find(p => p.id === selectedPatientId)?.name || 'Detalhes'}
                    </span>
                  )}
                </>
              )}

              {activeScreen === 'usuarios' && (
                <span className="breadcrumb-active">Usuários</span>
              )}

              {activeScreen === 'auditTrail' && (
                <span className="breadcrumb-active">Audit Trail</span>
              )}
            </div>
          </div>

          <div className="top-bar-right">
            <button className="top-bar-btn" title="Notificações">
              <Icons.Bell />
              {alertList.length > 0 && <span className="notification-badge">{alertList.length}</span>}
            </button>
            
            <div style={{ height: '24px', width: '1px', backgroundColor: '#e0e0e0' }} />
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: '500', color: '#161616' }}>
                {currentUserDetail.name}
              </span>
              <Icons.User />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="content-area">
          
          {/* ==========================================
              SCREEN 2: MAIN DASHBOARD (Home)
              ========================================== */}
          {activeScreen === 'dashboard' && (
            <div>
              {/* Alert Notification Banner (Cold Chain alert) */}
              <div className="alert-banner warning">
                <Icons.AlertCircle style={{ color: '#F1C21B', flexShrink: 0 }} />
                <div className="alert-banner-content">
                  <div className="alert-banner-title">Oscilação Térmica Detectada</div>
                  <div className="alert-banner-desc">
                    O freezer <strong>ColdChain Pro 20 ({alertList[0]?.freezer})</strong> registrou temperatura de <strong>1.2°C</strong>, que está abaixo do limite de segurança (2.0°C a 8.0°C). Lotes armazenados foram colocados em análise.
                  </div>
                </div>
              </div>

              {/* KPI Cards Row */}
              <div className="kpi-grid">
                <div className="kpi-card success">
                  <div className="kpi-card-icon-container">
                    <Icons.Lotes />
                  </div>
                  <div className="kpi-card-body">
                    <span className="kpi-card-value">{isSkeletonActive ? <div className="skeleton" style={{ height: '20px', width: '40px' }} /> : kpiStats.activeLotes}</span>
                    <span className="kpi-card-label">Lotes Ativos</span>
                  </div>
                </div>

                <div className="kpi-card danger">
                  <div className="kpi-card-icon-container">
                    <Icons.AlertCircle />
                  </div>
                  <div className="kpi-card-body">
                    <span className="kpi-card-value">{isSkeletonActive ? <div className="skeleton" style={{ height: '20px', width: '40px' }} /> : kpiStats.alertFreezers}</span>
                    <span className="kpi-card-label">Freezers em Alerta</span>
                  </div>
                </div>

                <div className="kpi-card info">
                  <div className="kpi-card-icon-container">
                    <Icons.Aplicações />
                  </div>
                  <div className="kpi-card-body">
                    <span className="kpi-card-value">{isSkeletonActive ? <div className="skeleton" style={{ height: '20px', width: '40px' }} /> : kpiStats.applicationsToday}</span>
                    <span className="kpi-card-label">Aplicações Hoje</span>
                  </div>
                </div>

                <div className="kpi-card warning">
                  <div className="kpi-card-icon-container">
                    <Icons.AlertCircle />
                  </div>
                  <div className="kpi-card-body">
                    <span className="kpi-card-value">{isSkeletonActive ? <div className="skeleton" style={{ height: '20px', width: '40px' }} /> : kpiStats.expiringSoon}</span>
                    <span className="kpi-card-label">Lotes Vencendo em 30d</span>
                  </div>
                </div>
              </div>

              {/* Below KPIs split panels */}
              <div className="dashboard-columns">
                
                {/* Left panel: Últimas Aplicações */}
                <div className="panel" style={{ minWidth: 0 }}>
                  <div className="panel-header">
                    <span className="panel-title">Últimas Aplicações</span>
                    <button className="btn btn-secondary btn-sm" onClick={handleOpenAplicacaoModal}>
                      <Icons.Plus /> Registrar Aplicação
                    </button>
                  </div>

                  {isSkeletonActive ? (
                    renderSkeletonTable(4, 5)
                  ) : isEmptyStateActive ? (
                    renderEmptyState("Nenhuma aplicação recente", "Novas aplicações registradas no sistema aparecerão listadas nesta seção.")
                  ) : (
                    <div className="data-table-container">
                      <table className="data-table">
                        <thead>
                          <tr>
                            <th>Paciente</th>
                            <th>Vacina</th>
                            <th>Lote</th>
                            <th>Dose</th>
                            <th>Aplicado Por</th>
                            <th>Data</th>
                          </tr>
                        </thead>
                        <tbody>
                          {aplicacoes.slice(0, 5).map((app) => (
                            <tr key={app.id}>
                              <td style={{ fontWeight: '600' }}>{app.patient}</td>
                              <td>{app.vaccine}</td>
                              <td><span style={{ fontFamily: 'monospace' }}>{app.lot}</span></td>
                              <td>{app.dose}</td>
                              <td>{app.practitioner}</td>
                              <td>{app.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Right panel: Alertas Ativos */}
                <div className="panel">
                  <div className="panel-header">
                    <span className="panel-title">Alertas Ativos</span>
                  </div>

                  {isSkeletonActive ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div className="skeleton" style={{ height: '48px', width: '100%' }} />
                      <div className="skeleton" style={{ height: '48px', width: '100%' }} />
                    </div>
                  ) : isEmptyStateActive || alertList.length === 0 ? (
                    renderEmptyState("Cadeia de frio segura", "Não há nenhuma oscilação térmica ativa detectada nos freezers.")
                  ) : (
                    <div className="alert-list">
                      {alertList.map((al) => (
                        <div key={al.id} className={`alert-item ${al.level}`}>
                          <div className="alert-item-icon">
                            <Icons.AlertCircle />
                          </div>
                          <div className="alert-item-details">
                            <span className="alert-item-title">{al.name} ({al.freezer})</span>
                            <span className="alert-item-desc">Temperatura: {al.temp} (Faixa: {al.range})</span>
                          </div>
                          <div className="alert-item-meta">
                            {al.timeAgo}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* ==========================================
              SCREEN 3: FREEZERS SCREEN
              ========================================== */}
          {activeScreen === 'freezers' && (
            <div>
              <div className="page-header">
                <h1>Painel de Monitoramento de Freezers</h1>
                <button 
                  className="btn btn-primary"
                  onClick={() => alert("Simulação: Abertura do formulário de cadastro de Freezer.")}
                >
                  <Icons.Plus /> Cadastrar Freezer
                </button>
              </div>

              {/* Filter Bar */}
              <div className="filter-bar">
                <div className="filter-bar-left">
                  <div className="search-input-wrapper">
                    <span className="search-icon-inside"><Icons.Search /></span>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Pesquisar freezer por série, modelo ou local..." 
                      value={filters.freezers.search}
                      onChange={(e) => handleFilterChange('freezers', 'search', e.target.value)}
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#525252' }}>Status:</span>
                    <select 
                      className="form-control" 
                      style={{ width: '180px', padding: '6px var(--spacing-sm)' }}
                      value={filters.freezers.status}
                      onChange={(e) => handleFilterChange('freezers', 'status', e.target.value)}
                    >
                      <option value="Todos">Todos os Status</option>
                      <option value="NORMAL">NORMAL</option>
                      <option value="ALERTA">ALERTA</option>
                      <option value="FALHA DE COMUNICAÇÃO">FALHA DE COMUNICAÇÃO</option>
                    </select>
                  </div>
                </div>
              </div>

              {isSkeletonActive ? (
                renderSkeletonTable(4, 7)
              ) : isEmptyStateActive || computedFreezers.length === 0 ? (
                renderEmptyState("Nenhum freezer encontrado", "Revise os termos de pesquisa ou o filtro de status selecionado.")
              ) : (
                <div className="data-table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th className="sortable" onClick={() => handleSort('freezers', 'id')}>Nome/Série</th>
                        <th className="sortable" onClick={() => handleSort('freezers', 'model')}>Modelo</th>
                        <th className="sortable" onClick={() => handleSort('freezers', 'location')}>Localização</th>
                        <th>Faixa Segura</th>
                        <th className="sortable" onClick={() => handleSort('freezers', 'temp')}>Temperatura Atual</th>
                        <th className="sortable" onClick={() => handleSort('freezers', 'status')}>Status</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {computedFreezers.map((f) => (
                        <tr key={f.serial}>
                          <td style={{ fontWeight: '600' }}>
                            <span style={{ cursor: 'pointer', color: '#0f62fe' }} onClick={() => navigateTo('freezerDetail', f.serial)}>
                              {f.model} ({f.serial})
                            </span>
                          </td>
                          <td>{f.model}</td>
                          <td>{f.location}</td>
                          <td style={{ fontFamily: 'monospace' }}>{f.minSafe.toFixed(1)}°C a {f.maxSafe.toFixed(1)}°C</td>
                          <td style={{ fontWeight: '700', fontFamily: 'monospace' }}>
                            {f.temp !== null ? `${f.temp.toFixed(1)}°C` : '--'}
                          </td>
                          <td>{renderStatusBadge(f.status)}</td>
                          <td className="data-table-actions">
                            <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('freezerDetail', f.serial)}>
                              <Icons.Eye /> Ver
                            </button>
                            <button className="btn btn-secondary btn-sm" onClick={() => alert(`Simular edição do freezer: ${f.serial}`)}>
                              <Icons.Edit /> Editar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {renderPaginator('freezers', computedFreezers.length, tableCurrentPages.freezers, tablePageSizes.freezers)}
                </div>
              )}
            </div>
          )}

          {/* ==========================================
              SCREEN 4: FREEZER DETAIL SCREEN
              ========================================== */}
          {activeScreen === 'freezerDetail' && (() => {
            const freezer = freezers.find(f => f.serial === selectedFreezerSerial) || freezers[0];
            const matchingLotes = lotes.filter(l => l.freezer === freezer.serial);
            
            return (
              <div>
                <div className="page-header">
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ cursor: 'pointer', color: '#0F62FE', fontSize: '13px' }} onClick={() => navigateTo('freezers')}>← Voltar para Freezers</span>
                    </div>
                    <h1>Freezer {freezer.model} ({freezer.serial})</h1>
                  </div>
                </div>

                {/* Info and temp cards */}
                <div className="info-card-grid">
                  <div className="info-card">
                    <div className="info-card-label">Número de Série e Modelo</div>
                    <div className="info-card-value">{freezer.serial}</div>
                    <div style={{ fontSize: '12px', color: '#525252', marginTop: '4px' }}>{freezer.model}</div>
                  </div>

                  <div className="info-card">
                    <div className="info-card-label">Localização e Faixa</div>
                    <div className="info-card-value">{freezer.location}</div>
                    <div style={{ fontSize: '12px', color: '#525252', marginTop: '4px' }}>Limites: {freezer.minSafe.toFixed(1)}°C a {freezer.maxSafe.toFixed(1)}°C</div>
                  </div>

                  <div className="info-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div className="info-card-label">Temperatura Atual</div>
                      <div className={`info-card-value temp-large ${freezer.status === 'NORMAL' ? 'safe' : freezer.status === 'ALERTA' ? 'alert' : 'danger'}`}>
                        {freezer.temp !== null ? `${freezer.temp.toFixed(1)}°C` : '--'}
                      </div>
                    </div>
                    <div>
                      {renderStatusBadge(freezer.status)}
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="tabs-container">
                  <button 
                    className={`tab-btn ${freezerDetailTab === 'temperatura' ? 'active' : ''}`}
                    onClick={() => setFreezerDetailTab('temperatura')}
                  >
                    Histórico de Temperatura (24h)
                  </button>
                  <button 
                    className={`tab-btn ${freezerDetailTab === 'lotes' ? 'active' : ''}`}
                    onClick={() => setFreezerDetailTab('lotes')}
                  >
                    Lotes Armazenados ({matchingLotes.length})
                  </button>
                </div>

                {/* Tab content 1: Histórico */}
                {freezerDetailTab === 'temperatura' && (
                  <div className="panel">
                    <div className="panel-header">
                      <span className="panel-title">Gráfico de Monitoramento Contínuo</span>
                      <span style={{ fontSize: '12px', color: '#8d8d8d' }}>Intervalo de amostragem: 1 hora</span>
                    </div>
                    
                    {renderTemperatureChart(freezer.history, freezer.minSafe, freezer.maxSafe)}
                  </div>
                )}

                {/* Tab content 2: Lotes */}
                {freezerDetailTab === 'lotes' && (
                  <div className="panel">
                    <div className="panel-header">
                      <span className="panel-title">Medicamentos e Imunobiológicos Alocados</span>
                    </div>

                    {matchingLotes.length === 0 ? (
                      renderEmptyState("Nenhum lote armazenado", "Este freezer está vazio no momento.")
                    ) : (
                      <div className="data-table-container">
                        <table className="data-table">
                          <thead>
                            <tr>
                              <th>Lote</th>
                              <th>Vacina</th>
                              <th>Validade</th>
                              <th>Quantidade Atual</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {matchingLotes.map(l => (
                              <tr key={l.id}>
                                <td style={{ fontWeight: '600', fontFamily: 'monospace' }}>{l.id}</td>
                                <td>{l.vaccine}</td>
                                <td>{l.expiry}</td>
                                <td>{l.qtyCurrent} doses</td>
                                <td>{renderStatusBadge(l.status)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })()}

          {/* ==========================================
              SCREEN 5: LOTES SCREEN
              ========================================== */}
          {activeScreen === 'lotes' && (
            <div>
              <div className="page-header">
                <h1>Controle de Lotes de Vacinas</h1>
                <button className="btn btn-primary" onClick={handleOpenLoteModal}>
                  <Icons.Plus /> Cadastrar Lote
                </button>
              </div>

              {/* Filter Bar */}
              <div className="filter-bar">
                <div className="filter-bar-left">
                  <div className="search-input-wrapper">
                    <span className="search-icon-inside"><Icons.Search /></span>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Pesquisar lote por número, fornecedor..." 
                      value={filters.lotes.search}
                      onChange={(e) => handleFilterChange('lotes', 'search', e.target.value)}
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#525252' }}>Status:</span>
                    <select 
                      className="form-control" 
                      style={{ width: '160px', padding: '6px' }}
                      value={filters.lotes.status}
                      onChange={(e) => handleFilterChange('lotes', 'status', e.target.value)}
                    >
                      <option value="Todos">Todos</option>
                      <option value="DISPONIVEL">DISPONIVEL</option>
                      <option value="EM_QUARENTENA">EM_QUARENTENA</option>
                      <option value="EXPIRADO">EXPIRADO</option>
                      <option value="DESCARTADO">DESCARTADO</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#525252' }}>Vacina:</span>
                    <select 
                      className="form-control" 
                      style={{ width: '180px', padding: '6px' }}
                      value={filters.lotes.vaccine}
                      onChange={(e) => handleFilterChange('lotes', 'vaccine', e.target.value)}
                    >
                      <option value="Todos">Todas as Vacinas</option>
                      {VACCINES_LIST.map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {isSkeletonActive ? (
                renderSkeletonTable(5, 8)
              ) : isEmptyStateActive || computedLotes.length === 0 ? (
                renderEmptyState("Nenhum lote localizado", "Revise os filtros selecionados ou cadastre um novo lote.")
              ) : (
                <div className="data-table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th className="sortable" onClick={() => handleSort('lotes', 'id')}>Nº Lote</th>
                        <th className="sortable" onClick={() => handleSort('lotes', 'vaccine')}>Vacina</th>
                        <th className="sortable" onClick={() => handleSort('lotes', 'supplier')}>Fornecedor</th>
                        <th>Freezer Alocado</th>
                        <th className="sortable" onClick={() => handleSort('lotes', 'expiry')}>Validade</th>
                        <th className="sortable" onClick={() => handleSort('lotes', 'qtyCurrent')}>Qtd Atual</th>
                        <th className="sortable" onClick={() => handleSort('lotes', 'status')}>Status</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {computedLotes.map((l) => (
                        <tr key={l.id}>
                          <td style={{ fontWeight: '700', fontFamily: 'monospace' }}>{l.id}</td>
                          <td>{l.vaccine}</td>
                          <td>{l.supplier}</td>
                          <td>
                            <span 
                              style={{ cursor: 'pointer', color: '#0f62fe', textDecoration: 'underline' }} 
                              onClick={() => navigateTo('freezerDetail', l.freezer)}
                            >
                              {l.freezer}
                            </span>
                          </td>
                          <td>{l.expiry}</td>
                          <td>{l.qtyCurrent} / {l.qtyInitial} doses</td>
                          <td>{renderStatusBadge(l.status)}</td>
                          <td className="data-table-actions">
                            {l.status === 'EM_QUARENTENA' && (
                              <button 
                                className="btn btn-secondary btn-sm" 
                                style={{ borderColor: '#24A148', color: '#24A148' }}
                                onClick={() => triggerCriticalAction('QUARANTINE_RELEASE', l.id, `Liberar lote ${l.id} de quarentena. Esta ação tornará o lote disponível para aplicações.`)}
                              >
                                Liberar
                              </button>
                            )}
                            {l.status === 'DISPONIVEL' && (
                              <button 
                                className="btn btn-secondary btn-sm" 
                                style={{ borderColor: '#F1C21B', color: '#725a07' }}
                                onClick={() => triggerCriticalAction('PUT_IN_QUARANTINE', l.id, `Colocar o lote ${l.id} em Quarentena preventivamente.`)}
                              >
                                Quarentena
                              </button>
                            )}
                            {l.status !== 'DESCARTADO' && (
                              <button 
                                className="btn btn-danger btn-sm"
                                onClick={() => triggerCriticalAction('DISCARD_LOTE', l.id, `Descartar lote de vacina ${l.id}. Esta ação é irreversível e requer justificativa legal.`)}
                              >
                                Descartar
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {renderPaginator('lotes', computedLotes.length, tableCurrentPages.lotes, tablePageSizes.lotes)}
                </div>
              )}
            </div>
          )}

          {/* ==========================================
              SCREEN 7: PACIENTES SCREEN
              ========================================== */}
          {activeScreen === 'pacientes' && (
            <div>
              <div className="page-header">
                <h1>Cadastro de Pacientes</h1>
                <button 
                  className="btn btn-primary"
                  onClick={() => alert("Simulação: Abertura do formulário de cadastro de Paciente.")}
                >
                  <Icons.Plus /> Cadastrar Paciente
                </button>
              </div>

              {/* Filter Bar */}
              <div className="filter-bar">
                <div className="filter-bar-left">
                  <div className="search-input-wrapper" style={{ width: '100%' }}>
                    <span className="search-icon-inside"><Icons.Search /></span>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Pesquisar paciente por nome completo ou número de CPF..." 
                      value={filters.pacientes.search}
                      onChange={(e) => handleFilterChange('pacientes', 'search', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {isSkeletonActive ? (
                renderSkeletonTable(4, 6)
              ) : isEmptyStateActive || computedPacientes.length === 0 ? (
                renderEmptyState("Nenhum paciente localizado", "Insira outro termo de pesquisa ou cadastre o paciente no sistema.")
              ) : (
                <div className="data-table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th className="sortable" onClick={() => handleSort('pacientes', 'name')}>Nome do Paciente</th>
                        <th>CPF</th>
                        <th>Data de Nascimento</th>
                        <th>Telefone</th>
                        <th>Total de Aplicações</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {computedPacientes.map((p) => {
                        const count = aplicacoes.filter(a => a.patientId === p.id).length;
                        return (
                          <tr key={p.id}>
                            <td style={{ fontWeight: '600' }}>
                              <span style={{ cursor: 'pointer', color: '#0f62fe' }} onClick={() => navigateTo('pacienteDetail', p.id)}>
                                {p.name}
                              </span>
                            </td>
                            <td style={{ fontFamily: 'monospace' }}>{p.cpf}</td>
                            <td>{p.birthDate}</td>
                            <td>{p.phone}</td>
                            <td style={{ fontWeight: '600', textAlign: 'center' }}>{count}</td>
                            <td className="data-table-actions">
                              <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('pacienteDetail', p.id)}>
                                <Icons.Eye /> Histórico
                              </button>
                              <button className="btn btn-secondary btn-sm" onClick={() => alert(`Simular edição do paciente: ${p.name}`)}>
                                <Icons.Edit /> Editar
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {renderPaginator('pacientes', computedPacientes.length, tableCurrentPages.pacientes, tablePageSizes.pacientes)}
                </div>
              )}
            </div>
          )}

          {/* ==========================================
              SCREEN 8: PACIENTE DETAIL SCREEN
              ========================================== */}
          {activeScreen === 'pacienteDetail' && (() => {
            const patient = pacientes.find(p => p.id === selectedPatientId) || pacientes[0];
            const history = aplicacoes.filter(a => a.patientId === patient.id);

            return (
              <div>
                <div className="page-header">
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ cursor: 'pointer', color: '#0F62FE', fontSize: '13px' }} onClick={() => navigateTo('pacientes')}>← Voltar para Pacientes</span>
                    </div>
                    <h1>Prontuário de Imunização: {patient.name}</h1>
                  </div>
                  <button className="btn btn-primary" onClick={handleOpenAplicacaoModal}>
                    <Icons.Plus /> Registrar Nova Aplicação
                  </button>
                </div>

                {/* Patient Profile Card */}
                <div className="panel" style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '14px', textTransform: 'uppercase', color: '#525252', borderBottom: '1px solid #E0E0E0', paddingBottom: '8px', marginBottom: '16px' }}>Dados do Paciente</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <div className="info-card-label">CPF</div>
                      <div className="info-card-value" style={{ fontFamily: 'monospace' }}>{patient.cpf}</div>
                    </div>
                    <div>
                      <div className="info-card-label">Data de Nascimento</div>
                      <div className="info-card-value">{patient.birthDate}</div>
                    </div>
                    <div>
                      <div className="info-card-label">Sexo</div>
                      <div className="info-card-value">{patient.sex}</div>
                    </div>
                    <div>
                      <div className="info-card-label">Telefone de Contato</div>
                      <div className="info-card-value">{patient.phone}</div>
                    </div>
                    <div>
                      <div className="info-card-label">Alergias Registradas</div>
                      <div className="info-card-value">
                        {patient.allergies.length > 0 ? (
                          patient.allergies.map(a => <span key={a} className="allergy-tag">{a}</span>)
                        ) : (
                          <span style={{ color: '#8d8d8d', fontWeight: 'normal' }}>Nenhuma alergia relatada</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div style={{ borderTop: '1px solid #F4F4F4', paddingTop: '12px' }}>
                    <div className="info-card-label">Observações Clínicas</div>
                    <div style={{ fontSize: '13px', color: '#161616', fontStyle: 'italic' }}>{patient.notes}</div>
                  </div>
                </div>

                {/* Applications Table */}
                <div className="panel">
                  <h3 style={{ fontSize: '14px', textTransform: 'uppercase', color: '#525252', marginBottom: '16px' }}>Histórico de Vacinas Aplicadas</h3>
                  
                  {history.length === 0 ? (
                    renderEmptyState("Nenhuma vacina registrada", "Este paciente ainda não recebeu nenhuma aplicação cadastrada no sistema.")
                  ) : (
                    <div className="data-table-container">
                      <table className="data-table">
                        <thead>
                          <tr>
                            <th>Vacina</th>
                            <th>Lote</th>
                            <th>Dose</th>
                            <th>Via de Administração</th>
                            <th>Localizador / Unidade</th>
                            <th>Aplicado Por</th>
                            <th>Data</th>
                          </tr>
                        </thead>
                        <tbody>
                          {history.map(h => (
                            <tr key={h.id}>
                              <td style={{ fontWeight: '600' }}>{h.vaccine}</td>
                              <td style={{ fontFamily: 'monospace' }}>{h.lot}</td>
                              <td>{h.dose}</td>
                              <td>{h.route}</td>
                              <td>{h.site}</td>
                              <td>{h.practitioner}</td>
                              <td>{h.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}

          {/* ==========================================
              SCREEN 10: USUÁRIOS SCREEN
              ========================================== */}
          {activeScreen === 'usuarios' && (
            <div>
              <div className="page-header">
                <h1>Gerenciamento de Usuários</h1>
                <button className="btn btn-primary" onClick={() => alert("Simulação: Abertura do formulário de criação de usuário.")}>
                  <Icons.Plus /> Novo Usuário
                </button>
              </div>

              <div className="data-table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Email</th>
                      <th>Perfil</th>
                      <th>Último Login</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map(u => (
                      <tr key={u.id}>
                        <td style={{ fontWeight: '600' }}>{u.name}</td>
                        <td>{u.email}</td>
                        <td>
                          <span className={`badge ${u.role === 'QA' ? 'badge-warning' : u.role === 'AUDITOR' ? 'badge-info' : 'badge-secondary'}`}>
                            {u.role}
                          </span>
                        </td>
                        <td>{u.lastLogin}</td>
                        <td>{renderStatusBadge(u.status)}</td>
                        <td className="data-table-actions">
                          <button className="btn btn-secondary btn-sm" onClick={() => alert(`Simular edição de permissões: ${u.name}`)}>
                            Editar Perfil
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==========================================
              SCREEN 11: AUDIT TRAIL SCREEN
              ========================================== */}
          {activeScreen === 'auditTrail' && (
            <div>
              <div className="page-header">
                <h1>Rastreabilidade e Trilha de Auditoria (Audit Trail)</h1>
              </div>

              {/* Filter Bar */}
              <div className="filter-bar">
                <div className="filter-bar-left">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#525252' }}>Usuário:</span>
                    <select 
                      className="form-control"
                      value={filters.auditTrail.user}
                      onChange={(e) => handleFilterChange('auditTrail', 'user', e.target.value)}
                    >
                      <option value="Todos">Todos</option>
                      <option value="Felipe Augusto Castro">Felipe Augusto Castro</option>
                      <option value="Dr. Fernando Albuquerque">Dr. Fernando Albuquerque</option>
                      <option value="Juliana Pinho Rezende">Juliana Pinho Rezende</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#525252' }}>Ação:</span>
                    <select 
                      className="form-control"
                      value={filters.auditTrail.action}
                      onChange={(e) => handleFilterChange('auditTrail', 'action', e.target.value)}
                    >
                      <option value="Todos">Todas as Ações</option>
                      <option value="CREATE_APLICAÇÃO">CREATE_APLICAÇÃO</option>
                      <option value="CREATE_LOTE">CREATE_LOTE</option>
                      <option value="UPDATE_LOTE_STATUS">UPDATE_LOTE_STATUS</option>
                      <option value="RELEASE_QUARANTINE">RELEASE_QUARANTINE</option>
                      <option value="DISCARD_LOTE">DISCARD_LOTE</option>
                      <option value="QUARANTINE_LOTE">QUARANTINE_LOTE</option>
                    </select>
                  </div>
                </div>

                <div className="filter-bar-right">
                  <button className="btn btn-secondary btn-sm" onClick={() => alert("Simular exportação dos logs em CSV/PDF.")}>
                    Exportar Logs
                  </button>
                </div>
              </div>

              {/* Audit Trail Table */}
              <div className="data-table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th style={{ width: '40px' }}></th>
                      <th>Timestamp</th>
                      <th>Usuário</th>
                      <th>Ação</th>
                      <th>Entidade</th>
                      <th>ID Entidade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {computedAuditLogs.map(log => {
                      const isExpanded = !!expandedAuditRows[log.id];
                      return (
                        <React.Fragment key={log.id}>
                          <tr>
                            <td>
                              <button 
                                className="top-bar-btn" 
                                style={{ padding: '2px' }}
                                onClick={() => toggleAuditExpand(log.id)}
                              >
                                {isExpanded ? <Icons.ChevronDown /> : <Icons.ChevronRight />}
                              </button>
                            </td>
                            <td style={{ fontFamily: 'monospace' }}>{log.timestamp}</td>
                            <td style={{ fontWeight: '600' }}>{log.user}</td>
                            <td>
                              <span className="badge badge-secondary" style={{ fontFamily: 'monospace' }}>
                                {log.action}
                              </span>
                            </td>
                            <td>{log.entity}</td>
                            <td style={{ fontFamily: 'monospace' }}>{log.entityId}</td>
                          </tr>
                          
                          {/* Expanded JSON Diff Row (Screen 11 detailed) */}
                          {isExpanded && (
                            <tr>
                              <td colSpan="6" style={{ padding: 0 }}>
                                <div className="expanded-row-content">
                                  <div className="json-diff-container">
                                    <div>
                                      <div className="json-panel-header">Dados Anteriores</div>
                                      <pre className="json-panel">
                                        {log.prevData ? JSON.stringify(log.prevData, null, 2) : '// Nenhum dado anterior (Criação)'}
                                      </pre>
                                    </div>
                                    <div>
                                      <div className="json-panel-header" style={{ color: '#24A148' }}>Dados Novos</div>
                                      <pre className="json-panel" style={{ borderLeft: '3px solid #24A148' }}>
                                        {JSON.stringify(log.newData, null, 2)}
                                      </pre>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
                {renderPaginator('auditTrail', computedAuditLogs.length, tableCurrentPages.auditTrail, tablePageSizes.auditTrail)}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ==========================================
          SCREEN 6: CADASTRAR LOTE MODAL (Standard Overlay)
          ========================================== */}
      {modals.lote && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title" style={{ borderBottom: 'none', marginBottom: 0 }}>
                <Icons.Lotes /> Novo Lote de Imunobiológico
              </h2>
              <button className="modal-close-btn" onClick={() => setModals(prev => ({ ...prev, lote: false }))}>
                <Icons.XCircle />
              </button>
            </div>
            
            <form onSubmit={handleSaveLote}>
              <div className="modal-body">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Número do Lote <span className="required">*</span></label>
                    <input 
                      type="text" 
                      className="form-control"
                      placeholder="Ex: LT-2026-009"
                      value={loteForm.id}
                      onChange={(e) => setLoteForm(prev => ({ ...prev, id: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Data de Validade <span className="required">*</span></label>
                    <input 
                      type="date" 
                      className="form-control"
                      value={loteForm.expiry}
                      onChange={(e) => setLoteForm(prev => ({ ...prev, expiry: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Vacina / Imunobiológico <span className="required">*</span></label>
                  <select 
                    className="form-control"
                    value={loteForm.vaccine}
                    onChange={(e) => setLoteForm(prev => ({ ...prev, vaccine: e.target.value }))}
                    required
                  >
                    {VACCINES_LIST.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Fornecedor / Fabricante <span className="required">*</span></label>
                  <select 
                    className="form-control"
                    value={loteForm.supplier}
                    onChange={(e) => setLoteForm(prev => ({ ...prev, supplier: e.target.value }))}
                    required
                  >
                    {SUPPLIERS_LIST.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Freezer Alocado <span className="required">*</span></label>
                    <select 
                      className="form-control"
                      value={loteForm.freezer}
                      onChange={(e) => setLoteForm(prev => ({ ...prev, freezer: e.target.value }))}
                      required
                    >
                      {freezers.map(f => (
                        <option key={f.serial} value={f.serial}>
                          {f.model} ({f.serial})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Quantidade Inicial <span className="required">*</span></label>
                    <input 
                      type="number" 
                      className="form-control"
                      placeholder="Doses"
                      value={loteForm.qtyInitial}
                      onChange={(e) => setLoteForm(prev => ({ ...prev, qtyInitial: e.target.value }))}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setModals(prev => ({ ...prev, lote: false }))}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Cadastrar Lote
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          SCREEN 9: REGISTRAR APLICAÇÃO MODAL (FEFO Suggestion)
          ========================================== */}
      {modals.aplicacao && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title" style={{ borderBottom: 'none', marginBottom: 0 }}>
                <Icons.Aplicações /> Registrar Aplicação de Vacina
              </h2>
              <button className="modal-close-btn" onClick={() => setModals(prev => ({ ...prev, aplicacao: false }))}>
                <Icons.XCircle />
              </button>
            </div>

            <form onSubmit={handleSaveAplicacao}>
              <div className="modal-body">
                {/* Search Patient with autocomplete simulation */}
                <div className="form-group" style={{ position: 'relative' }}>
                  <label className="form-label">Paciente <span className="required">*</span></label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Pesquise por nome ou CPF do paciente..."
                    value={aplicacaoForm.searchInput}
                    onChange={(e) => handlePatientSearchChange(e.target.value)}
                    required
                  />
                  {patientSuggestions.length > 0 && (
                    <div className="autocomplete-dropdown">
                      {patientSuggestions.map(p => (
                        <div 
                          key={p.id} 
                          className="autocomplete-item"
                          onClick={() => selectPatientSuggestion(p)}
                        >
                          <strong>{p.name}</strong> - CPF: {p.cpf}
                        </div>
                      ))}
                    </div>
                  )}
                  {aplicacaoForm.patientId && (
                    <div style={{ marginTop: '4px', fontSize: '12px', color: '#24a148', fontWeight: '500' }}>
                      ✓ Paciente Selecionado: {aplicacaoForm.patientName} (ID: {aplicacaoForm.patientId})
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Vacina / Imunobiológico <span className="required">*</span></label>
                  <select 
                    className="form-control"
                    value={aplicacaoForm.vaccine}
                    onChange={(e) => setAplicacaoForm(prev => ({ ...prev, vaccine: e.target.value, lot: '' }))}
                    required
                  >
                    {VACCINES_LIST.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>

                {/* Auto suggested FEFO lote display */}
                <div className="form-group">
                  <label className="form-label">Lote Selecionado <span className="required">*</span></label>
                  <select 
                    className="form-control"
                    value={aplicacaoForm.lot || (suggestedLotForVaccine ? suggestedLotForVaccine.id : '')}
                    onChange={(e) => setAplicacaoForm(prev => ({ ...prev, lot: e.target.value }))}
                    required
                  >
                    {suggestedLotForVaccine ? (
                      <option value={suggestedLotForVaccine.id}>
                        {suggestedLotForVaccine.id} (Sugerido - Expira: {suggestedLotForVaccine.expiry} - {suggestedLotForVaccine.qtyCurrent} doses restantes)
                      </option>
                    ) : (
                      <option value="" disabled>-- Sem lotes ativos disponíveis --</option>
                    )}
                    {lotes.filter(l => l.vaccine === aplicacaoForm.vaccine && l.status === 'DISPONIVEL' && l.id !== suggestedLotForVaccine?.id).map(l => (
                      <option key={l.id} value={l.id}>
                        {l.id} (Expira: {l.expiry} - {l.qtyCurrent} doses restantes)
                      </option>
                    ))}
                  </select>

                  {/* FEFO Warning / suggestion hint */}
                  {suggestedLotForVaccine && (
                    <div className="form-hint warning">
                      <Icons.AlertCircle style={{ width: '14px', height: '14px' }} />
                      Lote sugerido por vencimento mais próximo (Regra FEFO).
                    </div>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Dose <span className="required">*</span></label>
                    <select 
                      className="form-control"
                      value={aplicacaoForm.dose}
                      onChange={(e) => setAplicacaoForm(prev => ({ ...prev, dose: e.target.value }))}
                      required
                    >
                      <option value="1ª Dose">1ª Dose</option>
                      <option value="2ª Dose">2ª Dose</option>
                      <option value="Reforço">Reforço</option>
                      <option value="Dose Única">Dose Única</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Via de Administração <span className="required">*</span></label>
                    <select 
                      className="form-control"
                      value={aplicacaoForm.route}
                      onChange={(e) => setAplicacaoForm(prev => ({ ...prev, route: e.target.value }))}
                      required
                    >
                      <option value="Intramuscular">Intramuscular</option>
                      <option value="Subcutânea">Subcutânea</option>
                      <option value="Intradérmica">Intradérmica</option>
                      <option value="Oral">Oral</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Local de Aplicação</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Ex: Deltoide Esquerdo / Unidade Central"
                    value={aplicacaoForm.site}
                    onChange={(e) => setAplicacaoForm(prev => ({ ...prev, site: e.target.value }))}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Observações</label>
                  <textarea 
                    className="form-control" 
                    placeholder="Alergias parciais, sintomas observados ou ocorrências..."
                    value={aplicacaoForm.notes}
                    onChange={(e) => setAplicacaoForm(prev => ({ ...prev, notes: e.target.value }))}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setModals(prev => ({ ...prev, aplicacao: false }))}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary" disabled={!suggestedLotForVaccine && !aplicacaoForm.lot}>
                  Registrar Aplicação
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          SCREEN 12: CRITICAL ACTION MODAL (Dual Password Auth)
          ========================================== */}
      {modals.critical && (
        <div className="modal-overlay">
          <div className="modal-content critical">
            <div className="modal-header critical">
              <h2 className="modal-title critical" style={{ borderBottom: 'none', marginBottom: 0 }}>
                <Icons.AlertCircle /> Confirmação de Ação Crítica
              </h2>
              <button className="modal-close-btn" onClick={() => setModals(prev => ({ ...prev, critical: false }))}>
                <Icons.XCircle />
              </button>
            </div>

            <form onSubmit={handleConfirmCriticalAction}>
              <div className="modal-body">
                {/* Visual warning */}
                <div style={{ backgroundColor: '#ffe6e6', border: '1px solid #ffcccc', padding: '12px', borderRadius: '4px', fontSize: '13px', color: '#da1e28', fontWeight: '500', marginBottom: '16px' }}>
                  Atenção: A ação solicitada é restrita e requer dupla validação com o supervisor da garantia de qualidade (QA).
                </div>

                <div style={{ fontSize: '13px', color: '#161616', marginBottom: '16px' }}>
                  <strong>Ação:</strong> {criticalActionForm.description}
                </div>

                {criticalActionForm.errorMsg && (
                  <div style={{ color: '#da1e28', fontSize: '12px', fontWeight: '600', marginBottom: '12px' }}>
                    Error: {criticalActionForm.errorMsg}
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Sua Senha (Operador / Auditor / QA) <span className="required">*</span></label>
                  <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Sua senha pessoal..."
                    value={criticalActionForm.myPassword}
                    onChange={(e) => setCriticalActionForm(prev => ({ ...prev, myPassword: e.target.value }))}
                    required
                  />
                  <span style={{ fontSize: '10px', color: '#8d8d8d' }}>Sandbox pass: <strong>123</strong></span>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Senha do Supervisor QA <span className="required">*</span></label>
                  <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Assinatura eletrônica do QA..."
                    value={criticalActionForm.supervisorPassword}
                    onChange={(e) => setCriticalActionForm(prev => ({ ...prev, supervisorPassword: e.target.value }))}
                    required
                  />
                  <span style={{ fontSize: '10px', color: '#8d8d8d' }}>Sandbox supervisor pass: <strong>qa123</strong></span>
                </div>
              </div>

              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setModals(prev => ({ ...prev, critical: false }))}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-danger">
                  Confirmar Ação
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
