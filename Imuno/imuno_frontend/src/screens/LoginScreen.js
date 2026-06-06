import React from 'react';

export const LoginScreen = ({ onLogin, onSandboxLogin }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo-container">
          <div style={{ color: '#0F62FE', marginBottom: '8px' }}>
            <svg style={{ width: '48px', height: '48px', fill: 'currentColor' }} viewBox="0 0 24 24">
              <path d="M19 3H14.82C14.4 1.84 13.3 1 12 1S9.6 1.84 9.18 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M12 3C12.55 3 13 3.45 13 4S12.55 5 12 5 11 4.55 11 4 11.45 3 12 3M17 18H7V17H17V18M10.3 14.7L9 16H7V14L8.3 12.7C8.1 12.1 8 11.6 8 11C8 8.8 9.8 7 12 7C12.6 7 13.1 7.1 13.7 7.3L12 9H14V11H12.3L15.3 14H17V12.3L18.7 14C18.9 14.6 19 15.1 19 15.7C19 17.9 17.2 19.7 15 19.7C14.4 19.7 13.9 19.6 13.3 19.4L12 20.7H10V18.7L11.3 17.4C10.9 16.6 10.5 15.7 10.3 14.7Z"/>
            </svg>
          </div>
          <div className="login-logo-text">ImunoPanel</div>
          <div className="login-logo-sub">Controle de Imunobiológicos & Cadeia de Frio</div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">E-mail Corporativo</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="exemplo@imuno.gov.br" 
              defaultValue="operador@imuno.gov.br"
              required 
            />
          </div>
          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label className="form-label">Senha</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="••••••••" 
              defaultValue="password123"
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '10px' }}>
            Entrar
          </button>
        </form>

        <div style={{ marginTop: '20px', borderTop: '1px solid #E0E0E0', paddingTop: '16px' }}>
          <div style={{ fontSize: '11px', fontWeight: '600', color: '#525252', marginBottom: '8px', textTransform: 'uppercase', textAlign: 'center' }}>
            Sandbox - Login Automático
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px' }}>
            <button className="btn btn-secondary btn-sm" onClick={() => onSandboxLogin('OPERADOR')}>Operador</button>
            <button className="btn btn-secondary btn-sm" onClick={() => onSandboxLogin('QA')}>QA</button>
            <button className="btn btn-secondary btn-sm" onClick={() => onSandboxLogin('AUDITOR')}>Auditor</button>
          </div>
        </div>

        <div className="login-footer">
          Sistema interno de controle de imunobiológicos
        </div>
      </div>
    </div>
  );
};
