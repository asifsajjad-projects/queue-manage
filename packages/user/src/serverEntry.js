import React from 'react';
import { renderToString } from 'react-dom/server';
import UserApp from './App.jsx';

export default {
  render: () => renderToString(React.createElement(UserApp))
};
