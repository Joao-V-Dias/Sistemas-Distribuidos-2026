import React from 'react';
import { Icons } from '../components/Icons';
import { DataTable } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';

export const FreezersScreen = ({
  computedFreezers,
  isSkeletonActive,
  isEmptyStateActive,
  filters,
  handleFilterChange,
  handleSort,
  sortConfig,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
  navigateToDetail
}) => {
  const headers = [
    { key: 'id', label: 'Nome/Série', sortable: true },
    { key: 'model', label: 'Modelo', sortable: true },
    { key: 'location', label: 'Localização', sortable: true },
    { key: 'range', label: 'Faixa Segura', sortable: false },
    { key: 'temp', label: 'Temperatura Atual', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'actions', label: 'Ações', sortable: false }
  ];

  return (
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
              value={filters.search}
              onChange={(e) => handleFilterChange('freezers', 'search', e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: '#525252' }}>Status:</span>
            <select 
              className="form-control" 
              style={{ width: '180px', padding: '6px' }}
              value={filters.status}
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

      <DataTable
        headers={headers}
        items={computedFreezers}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onSort={handleSort}
        sortConfig={sortConfig}
        tableKey="freezers"
        isSkeleton={isSkeletonActive}
        isEmpty={isEmptyStateActive}
        emptyTitle="Nenhum freezer encontrado"
        emptyDesc="Revise os termos de pesquisa ou o filtro de status selecionado."
      >
        {(f) => (
          <tr key={f.serial}>
            <td style={{ fontWeight: '600' }}>
              <span style={{ cursor: 'pointer', color: '#0f62fe' }} onClick={() => navigateToDetail('freezerDetail', f.serial)}>
                {f.model} ({f.serial})
              </span>
            </td>
            <td>{f.model}</td>
            <td>{f.location}</td>
            <td style={{ fontFamily: 'monospace' }}>{f.minSafe.toFixed(1)}°C a {f.maxSafe.toFixed(1)}°C</td>
            <td style={{ fontWeight: '700', fontFamily: 'monospace' }}>
              {f.temp !== null ? `${f.temp.toFixed(1)}°C` : '--'}
            </td>
            <td><StatusBadge status={f.status} /></td>
            <td className="data-table-actions">
              <button className="btn btn-secondary btn-sm" onClick={() => navigateToDetail('freezerDetail', f.serial)}>
                <Icons.Eye /> Ver
              </button>
              <button className="btn btn-secondary btn-sm" onClick={() => alert(`Simular edição do freezer: ${f.serial}`)}>
                <Icons.Edit /> Editar
              </button>
            </td>
          </tr>
        )}
      </DataTable>
    </div>
  );
};
