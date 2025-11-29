import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import UserApp from './App.jsx';

const container = document.getElementById('root');
if (container) {
  if (container.hasChildNodes()) {
    hydrateRoot(container, <UserApp />);
  } else {
    const root = createRoot(container);
    root.render(<UserApp />);
  }
}
