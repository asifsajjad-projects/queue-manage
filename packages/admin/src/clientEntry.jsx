import React from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
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
