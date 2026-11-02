'use client';

import React from 'react';
import { BarChart2, PieChart } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell } from 'recharts';
import styles from './UsageCharts.module.css';

const activityData = [
  { name: 'Apr 1', success: 1200, failed: 100 },
  { name: 'Apr 7', success: 1500, failed: 120 },
  { name: 'Apr 13', success: 1300, failed: 90 },
  { name: 'Apr 19', success: 1650, failed: 110 },
  { name: 'Apr 25', success: 1400, failed: 130 },
  { name: 'Apr 30', success: 1600, failed: 150 },
];

const toolData = [
  { name: 'Content Generator', value: 8240, color: '#3b82f6' },
  { name: 'Campaign Planner', value: 6540, color: '#8b5cf6' },
  { name: 'Growth Recommendations', value: 3860, color: '#10b981' },
];

export default function UsageCharts() {
  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.titleWrap}>
            <BarChart2 size={18} className={styles.icon} />
            <h3 className={styles.title}>AI Generation Activity</h3>
          </div>
          <div className={styles.legend}>
            <span className={styles.legendItem}><span className={styles.dot} style={{ background: '#3b82f6' }}></span> Successful</span>
            <span className={styles.legendItem}><span className={styles.dot} style={{ background: '#ef4444' }}></span> Failed</span>
          </div>
        </div>
        <div className={styles.chartArea}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activityData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--color-text-secondary)' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--color-text-secondary)' }} tickFormatter={(val) => `${val/1000}K`} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-primary)', fontSize: '12px' }} />
              <Area type="monotone" dataKey="success" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorSuccess)" />
              <Area type="monotone" dataKey="failed" stroke="#ef4444" strokeWidth={2} fillOpacity={0} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.titleWrap}>
            <PieChart size={18} className={styles.icon} />
            <h3 className={styles.title}>Usage by AI Tool</h3>
          </div>
        </div>
        <div className={styles.donutWrap}>
          <div className={styles.donutChart}>
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie data={toolData} innerRadius={50} outerRadius={70} paddingAngle={2} dataKey="value" stroke="none">
                  {toolData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </RePieChart>
            </ResponsiveContainer>
            <div className={styles.centerText}>
              <span className={styles.centerVal}>18,640</span>
              <span className={styles.centerLabel}>Total</span>
            </div>
          </div>
          <div className={styles.customLegend}>
            {toolData.map((tool, i) => (
              <div key={i} className={styles.legendRow}>
                <span className={styles.dot} style={{ background: tool.color }}></span>
                <div className={styles.legendText}>
                  <span className={styles.lTitle}>{tool.name}</span>
                  <span className={styles.lVal}>{tool.value.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
