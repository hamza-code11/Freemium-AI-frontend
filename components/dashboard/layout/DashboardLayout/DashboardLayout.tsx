'use client';

import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import styles from './DashboardLayout.module.css';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleMobile = () => setIsMobileOpen((prev) => !prev);
  const toggleCollapse = () => setIsCollapsed((prev) => !prev);

  return (
    <div className={`${styles.layout} ${isCollapsed ? styles.collapsed : ''}`}>
      
      <Sidebar 
        isMobileOpen={isMobileOpen} 
        closeMobile={() => setIsMobileOpen(false)}
        isCollapsed={isCollapsed}
        toggleCollapse={toggleCollapse}
      />
      
      <div className={styles.mainArea}>
        <Header onMenuClick={toggleMobile} />
        <main className={styles.contentArea}>
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className={styles.overlay} 
          onClick={() => setIsMobileOpen(false)} 
        />
      )}
    </div>
  );
}
