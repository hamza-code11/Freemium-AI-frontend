'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>) },
  { label: 'AI Content', href: '/dashboard/content-generator', icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>) },
  { label: 'Campaigns', href: '/dashboard/campaigns', icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l18-5v12L3 14v-3z"></path><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path></svg>) },
  { label: 'Growth Insights', href: '/dashboard/growth', icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>) },
  { label: 'Analytics', href: '/dashboard/analytics', icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10"></path><path d="M12 20V4"></path><path d="M6 20v-6"></path></svg>) },
];

const BOTTOM_ITEMS = [
  { label: 'History', href: '/dashboard/history', icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>) },
  { label: 'Profile', href: '/dashboard/profile', icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>) }, 
];

interface SidebarProps {
  isMobileOpen: boolean;
  closeMobile: () => void;
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

export default function Sidebar({ isMobileOpen, closeMobile, isCollapsed, toggleCollapse }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={`${styles.sidebar} ${isMobileOpen ? styles.mobileOpen : ''} ${isCollapsed ? styles.collapsed : ''}`}>
      
      {/* Top: Logo & Collapse Toggle */}
      <div className={styles.sidebarHeader}>
        
        {/* Logo Area (Hides on collapse) */}
        <Link href="/" className={`${styles.logoArea} ${isCollapsed ? styles.hideOnCollapse : ''}`} onClick={closeMobile}>
          <Image src="/logo/logo.png" alt="Freemium AI" width={140} height={40} className={styles.logoImg} />
          <span className={styles.logoText}>Freemium AI</span>
        </Link>
        
        {/* Collapse Button (Hamesha visible rahega) */}
        <button className={styles.collapseBtn} onClick={toggleCollapse} aria-label="Toggle Sidebar">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="4" ry="4"></rect>
            <line x1="9" y1="3" x2="9" y2="21"></line>
          </svg>
        </button>
      </div>

      {/* Main Navigation */}
      <nav className={styles.nav}>
        <span className={`${styles.navLabel} ${isCollapsed ? styles.hideOnCollapse : ''}`}>MENU</span>
        {NAV_ITEMS.map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className={`${styles.navItem} ${pathname === item.href ? styles.active : ''}`}
            onClick={closeMobile}
            title={isCollapsed ? item.label : undefined}
          >
            <span className={styles.iconWrapper}>{item.icon}</span>
            <span className={`${styles.navText} ${isCollapsed ? styles.hideOnCollapse : ''}`}>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Bottom Navigation */}
      <div className={styles.bottomNav}>
        {BOTTOM_ITEMS.map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className={`${styles.navItem} ${pathname === item.href ? styles.active : ''}`}
            onClick={closeMobile}
            title={isCollapsed ? item.label : undefined}
          >
            <span className={styles.iconWrapper}>{item.icon}</span>
            <span className={`${styles.navText} ${isCollapsed ? styles.hideOnCollapse : ''}`}>{item.label}</span>
          </Link>
        ))}
      </div>

    </aside>
  );
}
