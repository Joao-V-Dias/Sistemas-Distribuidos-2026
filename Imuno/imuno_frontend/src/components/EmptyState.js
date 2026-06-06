import React from 'react';

export const EmptyState = ({ title, desc }) => {
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
