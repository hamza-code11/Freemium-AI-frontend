'use client';

import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import styles from './AdminLayout.module.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleMobile = () => setIsMobileOpen((prev) => !prev);
  const toggleCollapse = () => setIsCollapsed((prev) => !prev);

  return (
    <div className={`${styles.layout} ${isCollapsed ? styles.collapsed : ''}`}>
      
      <AdminSidebar 
        isMobileOpen={isMobileOpen} 
        closeMobile={() => setIsMobileOpen(false)}
        isCollapsed={isCollapsed}
        toggleCollapse={toggleCollapse}
      />
      
      <div className={styles.mainArea}>
        <AdminHeader onMenuClick={toggleMobile} />
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
