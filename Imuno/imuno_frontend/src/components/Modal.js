import React from 'react';
import { Icons } from './Icons';

export const Modal = ({ isOpen, onClose, title, children, isCritical = false }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className={`modal-content ${isCritical ? 'critical' : ''}`}>
        <div className={`modal-header ${isCritical ? 'critical' : ''}`}>
          <h2 className={`modal-title ${isCritical ? 'critical' : ''}`} style={{ borderBottom: 'none', marginBottom: 0 }}>
            {isCritical && <Icons.AlertCircle style={{ color: '#DA1E28' }} />}
            {!isCritical && <Icons.Syringe style={{ color: '#0F62FE' }} />}
            <span style={{ marginLeft: '4px' }}>{title}</span>
          </h2>
          <button className="modal-close-btn" onClick={onClose}>
            <Icons.XCircle />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
