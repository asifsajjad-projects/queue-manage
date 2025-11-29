import React, { useState } from 'react';
import Home from './Home';
import ConfigFields from './ConfigFields';
import useAdminApi from '../hooks/useAdminApi';

export default function Dashboard() {
  const [tab, setTab] = useState('home');
  const api = useAdminApi();

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <header style={{ padding: 12, borderBottom: '1px solid #ddd' }}>
        <h1>Admin Dashboard</h1>
        <nav>
          <button onClick={() => setTab('home')} style={{ marginRight: 8 }}>Home</button>
          <button onClick={() => setTab('config')}>Configure Fields</button>
        </nav>
      </header>

      <main>
        {tab === 'home' && <Home stats={api.stats} />}
        {tab === 'config' && <ConfigFields api={api} />}
      </main>
    </div>
  );
}
