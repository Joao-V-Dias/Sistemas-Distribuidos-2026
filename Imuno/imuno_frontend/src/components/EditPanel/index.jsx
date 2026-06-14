import { useEffect, useState } from "react";

import "./style.css";

function EditPanel({ isOpen, onClose, title, data, fields = [], onSave }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  function handleChange(key, value) {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function renderInput(field) {
    if (field.type === "checkbox") {
      return (
        <input
          type="checkbox"
          checked={formData[field.key] || false}
          onChange={(e) => handleChange(field.key, e.target.checked)}
        />
      );
    }

    if (field.type === "select") {
      return (
        <select
          value={formData[field.key] || ""}
          onChange={(e) => handleChange(field.key, e.target.value)}
        >
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type={field.type || "text"}
        value={formData[field.key] || ""}
        onChange={(e) => handleChange(field.key, e.target.value)}
      />
    );
  }

  async function handleSave() {
    await onSave(formData);
    onClose();
  }

  return (
    <>
      <div
        className={isOpen ? "panel-overlay active" : "panel-overlay"}
        onClick={onClose}
      />

      <div className={isOpen ? "edit-panel open" : "edit-panel"}>
        <div className="panel-header">
          <h2>{title}</h2>
          <button onClick={onClose}>×</button>
        </div>

        <div className="panel-content">
          {fields.map((field) => (
            <div key={field.key} className="input-group">
              <label>{field.label}</label>
              {renderInput(field)}
            </div>
          ))}
        </div>

        <div className="panel-footer">
          <button className="save-button" onClick={handleSave}>
            Salvar
          </button>
        </div>
      </div>
    </>
  );
}

export default EditPanel;
