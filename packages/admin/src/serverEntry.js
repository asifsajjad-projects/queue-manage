import React from 'react';
import { renderToString } from 'react-dom/server';
import AdminApp from './App.jsx';

export default {
  render: () => renderToString(React.createElement(AdminApp))
};
