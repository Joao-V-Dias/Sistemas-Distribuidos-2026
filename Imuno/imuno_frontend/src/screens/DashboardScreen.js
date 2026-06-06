import React from 'react';
import { KPICard } from '../components/KPICard';
import { AlertBanner } from '../components/AlertBanner';
import { Icons } from '../components/Icons';
import { EmptyState } from '../components/EmptyState';
import { SkeletonTable } from '../components/SkeletonTable';

export const DashboardScreen = ({
  kpiStats,
  isSkeletonActive,
  isEmptyStateActive,
  aplicacoes,
  alertList,
  onOpenAplicacao
}) => {
  return (
    <div>
      {/* Alert Notification Banner */}
      <AlertBanner 
        type="warning"
        title="Oscilação Térmica Detectada"
        description={`O freezer ColdChain Pro 20 (${alertList[0]?.freezer || 'SN-492019'}) registrou temperatura de ${alertList[0]?.temp || '1.2°C'}, que está abaixo do limite de segurança (2.0°C a 8.0°C). Lotes armazenados foram colocados em análise.`}
      />

      {/* KPI Cards Row */}
      <div className="kpi-grid">
        <KPICard 
          type="success"
          value={kpiStats.activeLotes}
          label="Lotes Ativos"
          icon={Icons.Lotes}
          isSkeleton={isSkeletonActive}
        />

        <KPICard 
          type="danger"
          value={kpiStats.alertFreezers}
          label="Freezers em Alerta"
          icon={Icons.AlertCircle}
          isSkeleton={isSkeletonActive}
        />

        <KPICard 
          type="info"
          value={kpiStats.applicationsToday}
          label="Aplicações Hoje"
          icon={Icons.Aplicações}
          isSkeleton={isSkeletonActive}
        />

        <KPICard 
          type="warning"
          value={kpiStats.expiringSoon}
          label="Lotes Vencendo em 30d"
          icon={Icons.AlertCircle}
          isSkeleton={isSkeletonActive}
        />
      </div>

      {/* Below KPIs split panels */}
      <div className="dashboard-columns">
        
        {/* Left panel: Últimas Aplicações */}
        <div className="panel" style={{ minWidth: 0 }}>
          <div className="panel-header">
            <span className="panel-title">Últimas Aplicações</span>
            <button className="btn btn-secondary btn-sm" onClick={onOpenAplicacao}>
              <Icons.Plus /> Registrar Aplicação
            </button>
          </div>

          {isSkeletonActive ? (
            <SkeletonTable rows={4} cols={6} />
          ) : isEmptyStateActive || aplicacoes.length === 0 ? (
            <EmptyState 
              title="Nenhuma aplicação recente" 
              desc="Novas aplicações registradas no sistema aparecerão listadas nesta seção." 
            />
          ) : (
            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Paciente</th>
                    <th>Vacina</th>
                    <th>Lote</th>
                    <th>Dose</th>
                    <th>Aplicado Por</th>
                    <th>Data</th>
                  </tr>
                </thead>
                <tbody>
                  {aplicacoes.slice(0, 5).map((app) => (
                    <tr key={app.id}>
                      <td style={{ fontWeight: '600' }}>{app.patient}</td>
                      <td>{app.vaccine}</td>
                      <td><span style={{ fontFamily: 'monospace' }}>{app.lot}</span></td>
                      <td>{app.dose}</td>
                      <td>{app.practitioner}</td>
                      <td>{app.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right panel: Alertas Ativos */}
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Alertas Ativos</span>
          </div>

          {isSkeletonActive ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="skeleton" style={{ height: '48px', width: '100%' }} />
              <div className="skeleton" style={{ height: '48px', width: '100%' }} />
            </div>
          ) : isEmptyStateActive || alertList.length === 0 ? (
            <EmptyState 
              title="Cadeia de frio segura" 
              desc="Não há nenhuma oscilação térmica ativa detectada nos freezers." 
            />
          ) : (
            <div className="alert-list">
              {alertList.map((al) => (
                <div key={al.id} className={`alert-item ${al.level}`}>
                  <div className="alert-item-icon">
                    <Icons.AlertCircle />
                  </div>
                  <div className="alert-item-details">
                    <span className="alert-item-title">{al.name} ({al.freezer})</span>
                    <span className="alert-item-desc">Temperatura: {al.temp} (Faixa: {al.range})</span>
                  </div>
                  <div className="alert-item-meta">
                    {al.timeAgo}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
