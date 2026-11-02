'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './AIGenerationChart.module.css';

const data = [
  { name: 'Apr 18', generations: 8000 },
  { name: 'Apr 19', generations: 12000 },
  { name: 'Apr 20', generations: 14500 },
  { name: 'Apr 21', generations: 15500 },
  { name: 'Apr 22', generations: 16500 },
  { name: 'Apr 23', generations: 19000 },
  { name: 'Apr 24', generations: 17200 },
];

export default function AIGenerationChart() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleWrap}>
          <Sparkles size={18} className={styles.icon} />
          <h3 className={styles.title}>AI Generation Activity</h3>
        </div>
        <div className={styles.legend}>
          <span className={styles.legendItem}><span className={styles.dot} style={{ background: '#3b82f6' }}></span> Total Generations</span>
        </div>
      </div>
      
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorGen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--color-text-secondary)' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--color-text-secondary)' }} tickFormatter={(val) => `${val/1000}K`} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-primary)', fontSize: '12px' }} 
            />
            <Area type="monotone" dataKey="generations" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorGen)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
