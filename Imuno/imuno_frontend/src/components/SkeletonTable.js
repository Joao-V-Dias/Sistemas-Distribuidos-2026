import React from 'react';

export const SkeletonTable = ({ rows = 5, cols = 5 }) => {
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
