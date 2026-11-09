// components/dashboard/history/HistoryFilters.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Search, RotateCcw, ChevronDown } from 'lucide-react';
import styles from './HistoryFilters.module.css';

interface Filters {
  type_filter: string;
  date_range: string;
  custom_from: string;
  custom_to: string;
  sort: string;
  search: string;
  page: number;
}

interface Props {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
}

const TABS = [
  { label: 'All Items', value: 'all' },
  { label: 'Content', value: 'content' },
  { label: 'Campaign', value: 'campaign' },
  { label: 'Recommendations', value: 'recommendation' },
];

const DATE_RANGES = [
  { value: 'all', label: 'All Time' },
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'year', label: 'This Year' },
  { value: 'custom', label: 'Custom Range' },
];

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest First' },
  { value: 'oldest', label: 'Oldest First' },
];

export default function HistoryFilters({ filters, onChange }: Props) {
  const showCustomRange = filters.date_range === 'custom';
  
  // 🔥 Local search input (debounce ke liye)
  const [searchInput, setSearchInput] = useState(filters.search);

  // 🔥 Sync if parent resets
  useEffect(() => {
    setSearchInput(filters.search);
  }, [filters.search]);

  // 🔥 Debounce: 400ms baad parent ko bhejein
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== filters.search) {
        onChange({ search: searchInput });
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput, filters.search, onChange]);

  return (
    <div className={styles.container}>
      
      {/* Top Row */}
      <div className={styles.topRow}>
        <div className={styles.searchBox}>
          <Search size={16} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search your generated content..." 
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        
        <div className={styles.dropdownRow}>
          <div className={styles.selectWrapper}>
            <select 
              value={filters.date_range} 
              onChange={(e) => onChange({ date_range: e.target.value })}
            >
              {DATE_RANGES.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className={styles.selectIcon} />
          </div>

          <div className={styles.selectWrapper}>
            <select 
              value={filters.sort} 
              onChange={(e) => onChange({ sort: e.target.value })}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className={styles.selectIcon} />
          </div>
        </div>
      </div>

      {/* Custom Range */}
      {showCustomRange && (
        <div className={styles.customRangeRow}>
          <div className={styles.dateField}>
            <label>From</label>
            <input 
              type="date" 
              value={filters.custom_from} 
              onChange={(e) => onChange({ custom_from: e.target.value })} 
            />
          </div>
          <div className={styles.dateField}>
            <label>To</label>
            <input 
              type="date" 
              value={filters.custom_to} 
              onChange={(e) => onChange({ custom_to: e.target.value })} 
            />
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className={styles.bottomRow}>
        <div className={styles.tabs}>
          {TABS.map((tab) => (
            <button 
              key={tab.value}
              className={`${styles.tab} ${filters.type_filter === tab.value ? styles.activeTab : ''}`}
              onClick={() => onChange({ type_filter: tab.value })}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button 
          className={styles.clearBtn}
          onClick={() => {
            setSearchInput('');
            onChange({
              type_filter: 'all',
              date_range: 'all',
              custom_from: '',
              custom_to: '',
              sort: 'latest',
              search: '',
              page: 1,
            });
          }}
        >
          <RotateCcw size={14} /> Clear Filters
        </button>
      </div>

    </div>
  );
}
