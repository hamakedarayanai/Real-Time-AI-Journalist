import React from 'react';
import type { InfographicData } from '../types';

interface InfographicProps {
  data: InfographicData;
}

const Infographic: React.FC<InfographicProps> = ({ data }) => {
  // Access Recharts from the window object, as it's loaded via a script tag.
  // @ts-ignore
  const RechartsLib = window.Recharts;

  if (!RechartsLib) {
    // If the library isn't loaded yet, display a placeholder to prevent an error.
    return <div className="flex items-center justify-center h-80 text-slate-400">Loading Chart...</div>;
  }
  
  const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } = RechartsLib;
  
  if (!data || !data.data || data.data.length === 0) {
    return <p className="text-slate-400">No infographic data available for this article.</p>;
  }

  return (
    <div className="w-full h-80">
      <h4 className="text-center text-slate-300 font-semibold mb-4">{data.title}</h4>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data.data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
          <XAxis dataKey="label" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
            labelStyle={{ color: '#cbd5e1' }}
          />
          <Legend wrapperStyle={{ color: '#94a3b8' }} />
          <Bar dataKey="value" fill="#22d3ee" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Infographic;