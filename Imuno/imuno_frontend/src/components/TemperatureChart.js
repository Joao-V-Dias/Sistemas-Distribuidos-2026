import React from 'react';

export const TemperatureChart = ({ history, minSafe, maxSafe }) => {
  const width = 740;
  const height = 200;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;

  const validReadings = history.filter(v => v !== null);
  if (validReadings.length === 0) {
    return (
      <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fafafa', border: '1px solid #e0e0e0', color: '#8d8d8d' }}>
        Sem dados de temperatura históricos disponíveis para o período de 24h.
      </div>
    );
  }

  const maxTemp = Math.max(...validReadings, maxSafe) + 2.0;
  const minTemp = Math.min(...validReadings, minSafe) - 2.0;
  const tempRange = maxTemp - minTemp;

  const getX = (index) => paddingLeft + (index / (history.length - 1)) * (width - paddingLeft - paddingRight);
  const getY = (val) => {
    if (val === null) return height - paddingBottom;
    return paddingTop + ((maxTemp - val) / tempRange) * (height - paddingTop - paddingBottom);
  };

  const maxSafeY = getY(maxSafe);
  const minSafeY = getY(minSafe);

  let points = [];
  history.forEach((val, i) => {
    if (val !== null) {
      points.push(`${getX(i)},${getY(val)}`);
    }
  });
  const pointsStr = points.join(' ');

  return (
    <div style={{ backgroundColor: '#ffffff', padding: '12px', border: '1px solid #e0e0e0', borderRadius: '4px' }}>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="220" style={{ overflow: 'visible' }}>
        <line x1={paddingLeft} y1={paddingTop} x2={width - paddingRight} y2={paddingTop} stroke="#f0f0f0" />
        <line x1={paddingLeft} y1={(height - paddingBottom + paddingTop) / 2} x2={width - paddingRight} y2={(height - paddingBottom + paddingTop) / 2} stroke="#f0f0f0" />
        <line x1={paddingLeft} y1={height - paddingBottom} x2={width - paddingRight} y2={height - paddingBottom} stroke="#f0f0f0" />

        <text x={paddingLeft - 10} y={paddingTop + 4} textAnchor="end" fontSize="10" fill="#525252">{maxTemp.toFixed(1)}°C</text>
        <text x={paddingLeft - 10} y={(height - paddingBottom + paddingTop) / 2 + 4} textAnchor="end" fontSize="10" fill="#525252">{((maxTemp + minTemp) / 2).toFixed(1)}°C</text>
        <text x={paddingLeft - 10} y={height - paddingBottom + 4} textAnchor="end" fontSize="10" fill="#525252">{minTemp.toFixed(1)}°C</text>

        <line x1={paddingLeft} y1={maxSafeY} x2={width - paddingRight} y2={maxSafeY} stroke="#da1e28" strokeDasharray="4,4" strokeWidth="1.5" />
        <text x={width - paddingRight + 5} y={maxSafeY + 3} fontSize="10" fill="#da1e28" fontWeight="600">Max Limite ({maxSafe.toFixed(1)}°C)</text>
        
        <line x1={paddingLeft} y1={minSafeY} x2={width - paddingRight} y2={minSafeY} stroke="#da1e28" strokeDasharray="4,4" strokeWidth="1.5" />
        <text x={width - paddingRight + 5} y={minSafeY + 3} fontSize="10" fill="#da1e28" fontWeight="600">Min Limite ({minSafe.toFixed(1)}°C)</text>

        <polyline fill="none" stroke="#0f62fe" strokeWidth="2" points={pointsStr} />

        {history.map((val, i) => {
          if (val === null) return null;
          const cx = getX(i);
          const cy = getY(val);
          const isOut = val > maxSafe || val < minSafe;
          return (
            <g key={i}>
              <circle cx={cx} cy={cy} r={isOut ? "4" : "3"} fill={isOut ? "#da1e28" : "#0f62fe"} stroke="#ffffff" strokeWidth="1" />
              {(i % 4 === 0 || i === history.length - 1) && (
                <text x={cx} y={cy - 8} textAnchor="middle" fontSize="9" fontWeight="600" fill={isOut ? "#da1e28" : "#161616"}>
                  {val.toFixed(1)}°
                </text>
              )}
            </g>
          );
        })}

        <text x={paddingLeft} y={height - paddingBottom + 16} textAnchor="middle" fontSize="9" fill="#8d8d8d">24h atrás</text>
        <text x={paddingLeft + (width - paddingLeft - paddingRight) / 2} y={height - paddingBottom + 16} textAnchor="middle" fontSize="9" fill="#8d8d8d">12h atrás</text>
        <text x={width - paddingRight} y={height - paddingBottom + 16} textAnchor="middle" fontSize="9" fill="#8d8d8d">Agora</text>
      </svg>
    </div>
  );
};
