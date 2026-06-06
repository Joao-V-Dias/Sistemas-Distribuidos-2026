import React from 'react';
import { Icons } from '../components/Icons';
import { StatusBadge } from '../components/StatusBadge';
import { TemperatureChart } from '../components/TemperatureChart';
import { EmptyState } from '../components/EmptyState';

export const FreezerDetailScreen = ({
  freezer,
  matchingLotes,
  tab,
  onTabChange,
  onBack,
  onNavigateToFreezers
}) => {
  return (
    <div>
      <div className="page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ cursor: 'pointer', color: '#0F62FE', fontSize: '13px' }} onClick={onBack}>← Voltar para Freezers</span>
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
            <StatusBadge status={freezer.status} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        <button 
          className={`tab-btn ${tab === 'temperatura' ? 'active' : ''}`}
          onClick={() => onTabChange('temperatura')}
        >
          Histórico de Temperatura (24h)
        </button>
        <button 
          className={`tab-btn ${tab === 'lotes' ? 'active' : ''}`}
          onClick={() => onTabChange('lotes')}
        >
          Lotes Armazenados ({matchingLotes.length})
        </button>
      </div>

      {/* Tab content 1: Histórico */}
      {tab === 'temperatura' && (
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Gráfico de Monitoramento Contínuo</span>
            <span style={{ fontSize: '12px', color: '#8d8d8d' }}>Intervalo de amostragem: 1 hora</span>
          </div>
          
          <TemperatureChart 
            history={freezer.history} 
            minSafe={freezer.minSafe} 
            maxSafe={freezer.maxSafe} 
          />
        </div>
      )}

      {/* Tab content 2: Lotes */}
      {tab === 'lotes' && (
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Medicamentos e Imunobiológicos Alocados</span>
          </div>

          {matchingLotes.length === 0 ? (
            <EmptyState 
              title="Nenhum lote armazenado" 
              desc="Este freezer está vazio no momento." 
            />
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
                      <td><StatusBadge status={l.status} /></td>
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
};
