import React from 'react';
import { Icons } from './Icons';

export const StatusBadge = ({ status }) => {
  if (!status) return null;
  switch (status.toUpperCase()) {
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
