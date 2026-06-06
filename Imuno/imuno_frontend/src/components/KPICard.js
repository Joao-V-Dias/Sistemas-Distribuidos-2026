import React from 'react';

export const KPICard = ({ type, value, label, icon: Icon, isSkeleton }) => {
  return (
    <div className={`kpi-card ${type}`}>
      <div className="kpi-card-icon-container">
        {Icon && <Icon />}
      </div>
      <div className="kpi-card-body">
        <span className="kpi-card-value">
          {isSkeleton ? <div className="skeleton" style={{ height: '20px', width: '40px' }} /> : value}
        </span>
        <span className="kpi-card-label">{label}</span>
      </div>
    </div>
  );
};
