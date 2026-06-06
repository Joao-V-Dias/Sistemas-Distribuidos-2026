import React, { useState, useMemo } from 'react';
import { Modal } from '../components/Modal';
import { Icons } from '../components/Icons';

export const AplicacaoModal = ({ isOpen, onClose, onSave, pacientes, lotes, vaccines, currentUserRole }) => {
  const [form, setForm] = useState({
    patientName: '',
    patientId: '',
    searchInput: '',
    vaccine: vaccines[0] || '',
    lot: '',
    dose: '1ª Dose',
    route: 'Intramuscular',
    site: '',
    notes: ''
  });

  const [suggestions, setSuggestions] = useState([]);

  // FEFO (First Expired First Out) active lot calculation for chosen vaccine
  const suggestedLotForVaccine = useMemo(() => {
    const selectedVaccine = form.vaccine;
    if (!selectedVaccine) return null;
    
    // Find active lots for this vaccine
    const availableLots = lotes.filter(l => l.vaccine === selectedVaccine && l.status === 'DISPONIVEL' && l.qtyCurrent > 0);
    if (availableLots.length === 0) return null;

    // Sort by expiration (earliest first)
    availableLots.sort((a, b) => new Date(a.expiry) - new Date(b.expiry));
    return availableLots[0];
  }, [lotes, form.vaccine]);

  const handlePatientSearchChange = (val) => {
    setForm(prev => ({ ...prev, searchInput: val }));
    if (val.trim().length > 1) {
      const filtered = pacientes.filter(p => p.name.toLowerCase().includes(val.toLowerCase()) || p.cpf.includes(val));
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const selectPatientSuggestion = (patient) => {
    setForm(prev => ({
      ...prev,
      searchInput: patient.name,
      patientName: patient.name,
      patientId: patient.id
    }));
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const activeLotId = form.lot || (suggestedLotForVaccine ? suggestedLotForVaccine.id : '');
    
    if (!form.patientId) {
      alert("Por favor selecione um paciente cadastrado.");
      return;
    }
    if (!form.vaccine) {
      alert("Por favor selecione uma vacina.");
      return;
    }
    if (!activeLotId) {
      alert("Não há lotes válidos disponíveis para esta vacina.");
      return;
    }

    onSave({
      patient: form.patientName,
      patientId: form.patientId,
      vaccine: form.vaccine,
      lot: activeLotId,
      dose: form.dose,
      route: form.route,
      site: form.site || 'Não especificado',
      practitioner: currentUserRole === 'QA' ? 'Dr. Fernando Albuquerque' : 'Enf. Cleide Souza',
      notes: form.notes
    });

    // Reset
    setForm({
      patientName: '',
      patientId: '',
      searchInput: '',
      vaccine: vaccines[0] || '',
      lot: '',
      dose: '1ª Dose',
      route: 'Intramuscular',
      site: '',
      notes: ''
    });
  };

  const currentSelectedLot = form.lot || (suggestedLotForVaccine ? suggestedLotForVaccine.id : '');

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Registrar Aplicação de Vacina">
      <form onSubmit={handleSubmit}>
        <div className="modal-body">
          {/* Patient Autocomplete Search */}
          <div className="form-group" style={{ position: 'relative' }}>
            <label className="form-label">Paciente <span className="required">*</span></label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Pesquise por nome ou CPF do paciente..."
              value={form.searchInput}
              onChange={(e) => handlePatientSearchChange(e.target.value)}
              required
            />
            {suggestions.length > 0 && (
              <div className="autocomplete-dropdown">
                {suggestions.map(p => (
                  <div 
                    key={p.id} 
                    className="autocomplete-item"
                    onClick={() => selectPatientSuggestion(p)}
                  >
                    <strong>{p.name}</strong> - CPF: {p.cpf}
                  </div>
                ))}
              </div>
            )}
            {form.patientId && (
              <div style={{ marginTop: '4px', fontSize: '12px', color: '#24a148', fontWeight: '500' }}>
                ✓ Paciente Selecionado: {form.patientName} (ID: {form.patientId})
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Vacina / Imunobiológico <span className="required">*</span></label>
            <select 
              className="form-control"
              value={form.vaccine}
              onChange={(e) => setForm(prev => ({ ...prev, vaccine: e.target.value, lot: '' }))}
              required
            >
              {vaccines.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>

          {/* Lote matching dropdown */}
          <div className="form-group">
            <label className="form-label">Lote Selecionado <span className="required">*</span></label>
            <select 
              className="form-control"
              value={currentSelectedLot}
              onChange={(e) => setForm(prev => ({ ...prev, lot: e.target.value }))}
              required
            >
              {suggestedLotForVaccine ? (
                <option value={suggestedLotForVaccine.id}>
                  {suggestedLotForVaccine.id} (Sugerido - Expira: {suggestedLotForVaccine.expiry} - {suggestedLotForVaccine.qtyCurrent} doses restantes)
                </option>
              ) : (
                <option value="" disabled>-- Sem lotes ativos disponíveis --</option>
              )}
              {lotes.filter(l => l.vaccine === form.vaccine && l.status === 'DISPONIVEL' && l.id !== suggestedLotForVaccine?.id).map(l => (
                <option key={l.id} value={l.id}>
                  {l.id} (Expira: {l.expiry} - {l.qtyCurrent} doses restantes)
                </option>
              ))}
            </select>

            {/* FEFO suggestion hint */}
            {suggestedLotForVaccine && (
              <div className="form-hint warning">
                <Icons.AlertCircle style={{ width: '14px', height: '14px' }} />
                Lote sugerido por vencimento mais próximo (Regra FEFO).
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Dose <span className="required">*</span></label>
              <select 
                className="form-control"
                value={form.dose}
                onChange={(e) => setForm(prev => ({ ...prev, dose: e.target.value }))}
                required
              >
                <option value="1ª Dose">1ª Dose</option>
                <option value="2ª Dose">2ª Dose</option>
                <option value="Reforço">Reforço</option>
                <option value="Dose Única">Dose Única</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Via de Administração <span className="required">*</span></label>
              <select 
                className="form-control"
                value={form.route}
                onChange={(e) => setForm(prev => ({ ...prev, route: e.target.value }))}
                required
              >
                <option value="Intramuscular">Intramuscular</option>
                <option value="Subcutânea">Subcutânea</option>
                <option value="Intradérmica">Intradérmica</option>
                <option value="Oral">Oral</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Local de Aplicação</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Ex: Deltoide Esquerdo / Unidade Central"
              value={form.site}
              onChange={(e) => setForm(prev => ({ ...prev, site: e.target.value }))}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Observações</label>
            <textarea 
              className="form-control" 
              placeholder="Alergias parciais, sintomas observados ou ocorrências..."
              value={form.notes}
              onChange={(e) => setForm(prev => ({ ...prev, notes: e.target.value }))}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary" disabled={!currentSelectedLot}>
            Registrar Aplicação
          </button>
        </div>
      </form>
    </Modal>
  );
};
