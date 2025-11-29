import React, { useState, useEffect } from 'react';

export default function ConfigFields({ api }) {
  const exampleOrgs = ['default', 'AcmeCorp', 'Globex'];
  const exampleDepts = ['default', 'Sales', 'Support', 'HR'];

  const [org, setOrg] = useState(exampleOrgs[0]);
  const [dept, setDept] = useState(exampleDepts[0]);
  const [fields, setFields] = useState([]);
  const [newField, setNewField] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await api.fetchFields(org, dept);
      if (mounted) setFields(data?.fields || []);
    })();
    return () => { mounted = false };
  }, [org, dept]);

  const addField = () => {
    if (!newField) return;
    setFields(prev => [...prev, { name: newField, type: 'text' }]);
    setNewField('');
  };

  const removeField = (idx) => {
    setFields(prev => prev.filter((_, i) => i !== idx));
  };

  const save = async () => {
    const payload = { org, dept, fields };
    await api.saveFields(payload);
    alert('Saved');
  };

  return (
    <div style={{ padding: 12 }}>
      <h2 id="configure-title">Configure Queue Fields</h2>
      <div style={{ marginBottom: 8 }}>
        <label htmlFor="org-select">Organization:</label>
        <select id="org-select" value={org} onChange={e => setOrg(e.target.value)} style={{ marginLeft: 8 }} aria-label="Organization select">
          {exampleOrgs.map(o => <option key={o} value={o}>{o}</option>)}
        </select>

        <label htmlFor="dept-select" style={{ marginLeft: 12 }}>Department:</label>
        <select id="dept-select" value={dept} onChange={e => setDept(e.target.value)} style={{ marginLeft: 8 }} aria-label="Department select">
          {exampleDepts.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      <div style={{ marginBottom: 8 }}>
        <label htmlFor="new-field">Field name:</label>
        <input id="new-field" value={newField} onChange={e => setNewField(e.target.value)} placeholder="Field name" style={{ marginLeft: 8 }} />
        <button onClick={addField} style={{ marginLeft: 8 }} aria-label="Add field">Add Field</button>
      </div>

      <ul aria-label="Configured fields list">
        {fields.map((f, i) => (
          <li key={i}>{f.name} ({f.type}) <button onClick={() => removeField(i)} aria-label={`Remove field ${f.name}`}>Remove</button></li>
        ))}
      </ul>

      <div>
        <button onClick={save} aria-labelledby="configure-title">Save configuration for org/department</button>
      </div>
    </div>
  );
}
