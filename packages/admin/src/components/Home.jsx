import React from 'react';

function SimpleBarChart({ data = [] }) {
  const width = 400;
  const height = 150;
  const max = Math.max(...data.map(d => d.value), 1);
  const barWidth = Math.floor(width / Math.max(data.length, 1));

  return (
    <svg width={width} height={height} style={{ border: '1px solid #eee' }}>
      {data.map((d, i) => {
        const h = (d.value / max) * (height - 20);
        return (
          <g key={i}>
            <rect x={i * barWidth + 4} y={height - h - 20} width={barWidth - 8} height={h} fill="#4a90e2" />
            <text x={i * barWidth + 8} y={height - 6} fontSize={10}>{d.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

export default function Home({ stats }) {
  const data = stats ? [
    { label: 'Users', value: stats.users || 0 },
    { label: 'Queues', value: stats.queues || 0 }
  ] : [];

  return (
    <div style={{ padding: 12 }}>
      <h2>Home - Headcount</h2>
      {stats ? (
        <div>
          <SimpleBarChart data={data} />
        </div>
      ) : (
        <p>Loading stats...</p>
      )}
    </div>
  );
}
