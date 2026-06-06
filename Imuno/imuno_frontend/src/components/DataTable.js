import React from 'react';
import { SkeletonTable } from './SkeletonTable';
import { EmptyState } from './EmptyState';

export const Paginator = ({ tableKey, totalItems, currentPage, pageSize, onPageChange, onPageSizeChange }) => {
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="pagination-container">
      <div className="pagination-sizes">
        Visualizar: 
        <select 
          className="simulation-select" 
          style={{ marginLeft: '6px', color: '#161616', backgroundColor: '#fff', border: '1px solid #ccc', padding: '2px 6px', borderRadius: '2px', fontSize: '11px', outline: 'none', cursor: 'pointer' }}
          value={pageSize}
          onChange={(e) => onPageSizeChange(tableKey, parseInt(e.target.value))}
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
          onClick={() => onPageChange(tableKey, currentPage - 1)}
        >
          Anterior
        </button>
        <button 
          className="btn btn-secondary btn-sm"
          style={{ marginLeft: '4px' }}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(tableKey, currentPage + 1)}
        >
          Próximo
        </button>
      </div>
    </div>
  );
};

export const DataTable = ({
  headers,
  items,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onSort,
  sortConfig,
  tableKey,
  children,
  isSkeleton,
  isEmpty,
  emptyTitle = "Nenhum dado encontrado",
  emptyDesc = "Não há registros para exibir no momento."
}) => {
  if (isSkeleton) {
    return <SkeletonTable rows={5} cols={headers.length} />;
  }

  if (isEmpty || items.length === 0) {
    return <EmptyState title={emptyTitle} desc={emptyDesc} />;
  }

  // Calculate paginated slice
  const paginatedItems = items.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="data-table-container">
      <table className="data-table">
        <thead>
          <tr>
            {headers.map(h => (
              <th 
                key={h.key} 
                className={h.sortable ? 'sortable' : ''} 
                onClick={() => h.sortable && onSort(tableKey, h.key)}
              >
                {h.label}
                {h.sortable && sortConfig && sortConfig.key === h.key && (
                  <span style={{ marginLeft: '4px', fontSize: '10px' }}>
                    {sortConfig.direction === 'asc' ? ' ▲' : ' ▼'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedItems.map((item, index) => children(item, index))}
        </tbody>
      </table>
      
      <Paginator 
        tableKey={tableKey}
        totalItems={items.length}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
};
