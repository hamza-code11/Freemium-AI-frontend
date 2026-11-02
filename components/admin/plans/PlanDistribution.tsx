'use client';
    
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import styles from './PlanDistribution.module.css';

const data = [
  { name: 'Free Users', value: 1920, percent: '78%', color: '#3b82f6' },
  { name: 'Premium Users', value: 530, percent: '22%', color: '#c084fc' },
];

export default function PlanDistribution() {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Plan Distribution</h3>
      
      <div className={styles.content}>
        <div className={styles.chartWrap}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} innerRadius={50} outerRadius={70} paddingAngle={2} dataKey="value" stroke="none">
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className={styles.centerText}>
            <span className={styles.percent}>78%</span>
            <span className={styles.label}>Free</span>
          </div>
        </div>

        <div className={styles.legend}>
          {data.map((item, i) => (
            <div key={i} className={styles.legendItem}>
              <span className={styles.dot} style={{ background: item.color }}></span>
              <div className={styles.legendInfo}>
                <span className={styles.legendTitle}>{item.name}</span>
                <span className={styles.legendVal}>{item.value.toLocaleString()} ({item.percent})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
