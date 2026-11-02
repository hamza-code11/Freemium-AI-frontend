'use client';

import React, { useState } from 'react';
import { Search, RotateCcw, ChevronDown } from 'lucide-react';
import styles from './HistoryFilters.module.css';

const TABS = [
  { label: 'All Items', count: 48, active: true },
  { label: 'Saved Items', count: 15 },
  { label: 'Content', count: 32 },
  { label: 'Campaign', count: 10 },
  { label: 'Recommendations', count: 6 },
];

export default function HistoryFilters() {
  const [activeTab, setActiveTab] = useState('All Items');

  return (
    <div className={styles.container}>
      
      {/* Top Row: Search & Dropdowns */}
      <div className={styles.topRow}>
        <div className={styles.searchBox}>
          <Search size={16} className={styles.searchIcon} />
          <input type="text" placeholder="Search your generated content..." />
        </div>
        
        <div className={styles.dropdownRow}>
          <div className={styles.selectWrapper}>
            <span className={styles.selectLabel}>Content Type</span>
            <select>
              <option>All Types</option>
              <option>Social Post</option>
              <option>Ad Copy</option>
            </select>
            <ChevronDown size={14} className={styles.selectIcon} />
          </div>

          <div className={styles.selectWrapper}>
            <span className={styles.selectLabel}>Date Range</span>
            <select>
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
              <option>All Time</option>
            </select>
            <ChevronDown size={14} className={styles.selectIcon} />
          </div>

          <div className={styles.selectWrapper}>
            <span className={styles.selectLabel}>Sort By</span>
            <select>
              <option>Newest First</option>
              <option>Oldest First</option>
            </select>
            <ChevronDown size={14} className={styles.selectIcon} />
          </div>
        </div>
      </div>

      {/* Bottom Row: Tabs & Clear Filters */}
      <div className={styles.bottomRow}>
        <div className={styles.tabs}>
          {TABS.map((tab, i) => (
            <button 
              key={i} 
              className={`${styles.tab} ${activeTab === tab.label ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tab.label)}
            >
              {tab.label} {tab.count !== undefined && `(${tab.count})`}
            </button>
          ))}
        </div>
        <button className={styles.clearBtn}>
          <RotateCcw size={14} /> Clear Filters
        </button>
      </div>

    </div>
  );
}
