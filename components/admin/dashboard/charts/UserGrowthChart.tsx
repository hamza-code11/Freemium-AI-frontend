'use client';

import React from 'react';
import { TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './UserGrowthChart.module.css';

const data = [
  { name: 'Apr 18', total: 1200, premium: 800 },
  { name: 'Apr 19', total: 1350, premium: 900 },
  { name: 'Apr 20', total: 1500, premium: 1000 },
  { name: 'Apr 21', total: 1700, premium: 1100 },
  { name: 'Apr 22', total: 1850, premium: 1200 },
  { name: 'Apr 23', total: 2100, premium: 1350 },
  { name: 'Apr 24', total: 2300, premium: 1420 },
];

export default function UserGrowthChart() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleWrap}>
          <TrendingUp size={18} className={styles.icon} />
          <h3 className={styles.title}>User Growth</h3>
        </div>
        <div className={styles.legend}>
          <span className={styles.legendItem}><span className={styles.dot} style={{ background: '#3b82f6' }}></span> Total Users</span>
          <span className={styles.legendItem}><span className={styles.dot} style={{ background: '#8b5cf6' }}></span> Premium Users</span>
        </div>
      </div>
      
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorPremium" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--color-text-secondary)' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--color-text-secondary)' }} tickFormatter={(val) => `${val/1000}K`} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-primary)', fontSize: '12px' }} 
            />
            <Area type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorTotal)" />
            <Area type="monotone" dataKey="premium" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorPremium)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
