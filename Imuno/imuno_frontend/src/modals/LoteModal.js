import React, { useState } from 'react';
import { Modal } from '../components/Modal';

export const LoteModal = ({ isOpen, onClose, onSave, freezers, vaccines, suppliers }) => {
  const [form, setForm] = useState({
    id: '',
    vaccine: vaccines[0] || '',
    supplier: suppliers[0] || '',
    freezer: freezers[0]?.serial || '',
    expiry: '',
    qtyInitial: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.id || !form.expiry || !form.qtyInitial) {
      alert("Por favor preencha todos os campos obrigatórios.");
      return;
    }
    const qty = parseInt(form.qtyInitial);
    if (isNaN(qty) || qty <= 0) {
      alert("A quantidade inicial deve ser maior que zero.");
      return;
    }
    onSave({
      id: form.id.toUpperCase(),
      vaccine: form.vaccine,
      supplier: form.supplier,
      freezer: form.freezer,
      expiry: form.expiry,
      qtyInitial: qty,
      qtyCurrent: qty,
      status: 'DISPONIVEL'
    });
    // Reset form
    setForm({
      id: '',
      vaccine: vaccines[0] || '',
      supplier: suppliers[0] || '',
      freezer: freezers[0]?.serial || '',
      expiry: '',
      qtyInitial: ''
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Novo Lote de Imunobiológico">
      <form onSubmit={handleSubmit}>
        <div className="modal-body">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Número do Lote <span className="required">*</span></label>
              <input 
                type="text" 
                className="form-control"
                placeholder="Ex: LT-2026-009"
                value={form.id}
                onChange={(e) => setForm(prev => ({ ...prev, id: e.target.value }))}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Data de Validade <span className="required">*</span></label>
              <input 
                type="date" 
                className="form-control"
                value={form.expiry}
                onChange={(e) => setForm(prev => ({ ...prev, expiry: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Vacina / Imunobiológico <span className="required">*</span></label>
            <select 
              className="form-control"
              value={form.vaccine}
              onChange={(e) => setForm(prev => ({ ...prev, vaccine: e.target.value }))}
              required
            >
              {vaccines.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Fornecedor / Fabricante <span className="required">*</span></label>
            <select 
              className="form-control"
              value={form.supplier}
              onChange={(e) => setForm(prev => ({ ...prev, supplier: e.target.value }))}
              required
            >
              {suppliers.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Freezer Alocado <span className="required">*</span></label>
              <select 
                className="form-control"
                value={form.freezer}
                onChange={(e) => setForm(prev => ({ ...prev, freezer: e.target.value }))}
                required
              >
                {freezers.map(f => (
                  <option key={f.serial} value={f.serial}>
                    {f.model} ({f.serial})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Quantidade Inicial <span className="required">*</span></label>
              <input 
                type="number" 
                className="form-control"
                placeholder="Doses"
                value={form.qtyInitial}
                onChange={(e) => setForm(prev => ({ ...prev, qtyInitial: e.target.value }))}
                required
              />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            Cadastrar Lote
          </button>
        </div>
      </form>
    </Modal>
  );
};
