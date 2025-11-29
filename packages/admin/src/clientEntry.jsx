import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import AdminApp from './App.jsx';
import './styles.css';

const container = document.getElementById('root');
if (container) {
  if (container.hasChildNodes()) {
    hydrateRoot(container, <AdminApp />);
  } else {
    const root = createRoot(container);
    root.render(<AdminApp />);
  }
}
