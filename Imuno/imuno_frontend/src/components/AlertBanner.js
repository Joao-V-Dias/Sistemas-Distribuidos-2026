import React from 'react';
import { Icons } from './Icons';

export const AlertBanner = ({ type, title, description }) => {
  return (
    <div className={`alert-banner ${type}`}>
      <Icons.AlertCircle style={{ color: type === 'warning' ? '#F1C21B' : type === 'danger' ? '#DA1E28' : '#0F62FE', flexShrink: 0 }} />
      <div className="alert-banner-content">
        <div className="alert-banner-title">{title}</div>
        <div className="alert-banner-desc">{description}</div>
      </div>
    </div>
  );
};
