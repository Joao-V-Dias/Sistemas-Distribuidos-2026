import React, { useState } from 'react';
import { Modal } from '../components/Modal';

export const CriticalActionModal = ({ isOpen, onClose, onConfirm, description }) => {
  const [myPassword, setMyPassword] = useState('');
  const [supervisorPassword, setSupervisorPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!myPassword || !supervisorPassword) {
      setErrorMsg('Ambas as senhas são de preenchimento obrigatório.');
      return;
    }
    // Hardcoded sandbox credentials
    if (myPassword !== '123' || supervisorPassword !== 'qa123') {
      setErrorMsg('Credenciais inválidas. Use "123" para sua senha e "qa123" para senha do supervisor QA.');
      return;
    }
    
    // Call parent confirm callback
    onConfirm();
    
    // Reset passwords
    setMyPassword('');
    setSupervisorPassword('');
    setErrorMsg('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirmação de Ação Crítica" isCritical={true}>
      <form onSubmit={handleSubmit}>
        <div className="modal-body">
          <div style={{ backgroundColor: '#ffe6e6', border: '1px solid #ffcccc', padding: '12px', borderRadius: '4px', fontSize: '13px', color: '#da1e28', fontWeight: '500', marginBottom: '16px' }}>
            Atenção: A ação solicitada é restrita e requer dupla validação com o supervisor da garantia de qualidade (QA).
          </div>

          <div style={{ fontSize: '13px', color: '#161616', marginBottom: '16px' }}>
            <strong>Ação:</strong> {description}
          </div>

          {errorMsg && (
            <div style={{ color: '#da1e28', fontSize: '12px', fontWeight: '600', marginBottom: '12px' }}>
              Erro: {errorMsg}
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Sua Senha (Operador / Auditor / QA) <span className="required">*</span></label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="Sua senha pessoal..."
              value={myPassword}
              onChange={(e) => setMyPassword(e.target.value)}
              required
            />
            <span style={{ fontSize: '10px', color: '#8d8d8d' }}>Sandbox pass: <strong>123</strong></span>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Senha do Supervisor QA <span className="required">*</span></label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="Assinatura eletrônica do QA..."
              value={supervisorPassword}
              onChange={(e) => setSupervisorPassword(e.target.value)}
              required
            />
            <span style={{ fontSize: '10px', color: '#8d8d8d' }}>Sandbox supervisor pass: <strong>qa123</strong></span>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-danger">
            Confirmar Ação
          </button>
        </div>
      </form>
    </Modal>
  );
};
