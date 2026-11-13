'use client';

import React from 'react';
import { Search, MailOpen, Mail } from 'lucide-react';
import styles from './ContactFilters.module.css';

interface Props {
  search: string;
  onSearchChange: (v: string) => void;
  unreadOnly: boolean;
  onUnreadOnlyChange: (v: boolean) => void;
}

export default function ContactFilters({
  search,
  onSearchChange,
  unreadOnly,
  onUnreadOnlyChange,
}: Props) {
  return (
    <div className={styles.filters}>
      <div className={styles.searchBox}>
        <Search size={14} />
        <input
          type="text"
          placeholder="Search by name, email, or subject..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className={styles.tabGroup}>
        <button
          type="button"
          className={`${styles.tabBtn} ${!unreadOnly ? styles.tabActive : ''}`}
          onClick={() => onUnreadOnlyChange(false)}
        >
          <MailOpen size={13} /> All
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${unreadOnly ? styles.tabActive : ''}`}
          onClick={() => onUnreadOnlyChange(true)}
        >
          <Mail size={13} /> Unread
        </button>
      </div>
    </div>
  );
}