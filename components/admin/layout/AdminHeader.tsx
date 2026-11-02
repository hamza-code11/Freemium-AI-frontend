'use client';

import React from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import styles from './AdminHeader.module.css';

export default function AdminHeader({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className={styles.header}>
      
      <div className={styles.leftArea}>
        <button className={styles.menuBtn} onClick={onMenuClick} aria-label="Open menu">
          <Menu size={24} />
        </button>
        
        <div className={styles.searchBar}>
          <Search size={18} className={styles.searchIcon} />
          <input type="text" placeholder="Search users, subscriptions..." />
        </div>
      </div>

      <div className={styles.rightArea}>
        <ThemeToggle />
        
        <button className={styles.iconBtn} aria-label="Notifications">
          <Bell size={20} />
          <span className={styles.notificationDot}></span>
        </button>
        
        <div className={styles.userProfile}>
          <div className={styles.avatar}>A</div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>Admin User</span>
            <span className={styles.userRole}>Super Admin</span>
          </div>
        </div>
      </div>

    </header>
  );
}
