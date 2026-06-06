import React from 'react';
import { Icons } from '../components/Icons';
import { DataTable } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';

export const LotesScreen = ({
  computedLotes,
  isSkeletonActive,
  isEmptyStateActive,
  filters,
  vaccinesList,
  handleFilterChange,
  handleSort,
  sortConfig,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onOpenLoteModal,
  onNavigateToFreezer,
  triggerCriticalAction
}) => {
  const headers = [
    { key: 'id', label: 'Nº Lote', sortable: true },
    { key: 'vaccine', label: 'Vacina', sortable: true },
    { key: 'supplier', label: 'Fornecedor', sortable: true },
    { key: 'freezer', label: 'Freezer Alocado', sortable: false },
    { key: 'expiry', label: 'Validade', sortable: true },
    { key: 'qtyCurrent', label: 'Qtd Atual', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'actions', label: 'Ações', sortable: false }
  ];

  return (
    <div>
      <div className="page-header">
        <h1>Controle de Lotes de Vacinas</h1>
        <button className="btn btn-primary" onClick={onOpenLoteModal}>
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
              value={filters.search}
              onChange={(e) => handleFilterChange('lotes', 'search', e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: '#525252' }}>Status:</span>
            <select 
              className="form-control" 
              style={{ width: '160px', padding: '6px' }}
              value={filters.status}
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
              value={filters.vaccine}
              onChange={(e) => handleFilterChange('lotes', 'vaccine', e.target.value)}
            >
              <option value="Todos">Todas as Vacinas</option>
              {vaccinesList.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
        </div>
      </div>

      <DataTable
        headers={headers}
        items={computedLotes}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onSort={handleSort}
        sortConfig={sortConfig}
        tableKey="lotes"
        isSkeleton={isSkeletonActive}
        isEmpty={isEmptyStateActive}
        emptyTitle="Nenhum lote localizado"
        emptyDesc="Revise os filtros selecionados ou cadastre um novo lote."
      >
        {(l) => (
          <tr key={l.id}>
            <td style={{ fontWeight: '700', fontFamily: 'monospace' }}>{l.id}</td>
            <td>{l.vaccine}</td>
            <td>{l.supplier}</td>
            <td>
              <span 
                style={{ cursor: 'pointer', color: '#0f62fe', textDecoration: 'underline' }} 
                onClick={() => onNavigateToFreezer('freezerDetail', l.freezer)}
              >
                {l.freezer}
              </span>
            </td>
            <td>{l.expiry}</td>
            <td>{l.qtyCurrent} / {l.qtyInitial} doses</td>
            <td><StatusBadge status={l.status} /></td>
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
        )}
      </DataTable>
    </div>
  );
};
