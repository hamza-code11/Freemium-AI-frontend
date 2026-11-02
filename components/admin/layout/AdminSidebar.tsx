'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, CreditCard, Settings, FileText, LogOut } from 'lucide-react';
import styles from './AdminSidebar.module.css';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: <LayoutDashboard size={20} /> },
  { label: 'Users', href: '/admin/users', icon: <Users size={20} /> },
  { label: 'Subscriptions', href: '/admin/plans', icon: <CreditCard size={20} /> },
  { label: 'Content', href: '/admin/usage', icon: <FileText size={20} /> },
];

const BOTTOM_ITEMS = [
  { label: 'Settings', href: '/admin/profile', icon: <Settings size={20} /> },
];

interface SidebarProps {
  isMobileOpen: boolean;
  closeMobile: () => void;
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

export default function AdminSidebar({ isMobileOpen, closeMobile, isCollapsed, toggleCollapse }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={`${styles.sidebar} ${isMobileOpen ? styles.mobileOpen : ''} ${isCollapsed ? styles.collapsed : ''}`}>
      
      {/* Header */}
      <div className={styles.sidebarHeader}>
        <Link href="/" className={`${styles.logoArea} ${isCollapsed ? styles.hideOnCollapse : ''}`} onClick={closeMobile}>
          <Image src="/logo/logo.png" alt="Freemium AI" width={140} height={40} className={styles.logoImg} />
          <span className={styles.logoText}>Admin</span>
        </Link>
        
        <button className={styles.collapseBtn} onClick={toggleCollapse} aria-label="Toggle Sidebar">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="4" ry="4"></rect>
            <line x1="9" y1="3" x2="9" y2="21"></line>
          </svg>
        </button>
      </div>

      {/* Nav */}
      <nav className={styles.nav}>
        <span className={`${styles.navLabel} ${isCollapsed ? styles.hideOnCollapse : ''}`}>ADMIN MENU</span>
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

      {/* Bottom Nav */}
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
        
        {/* Logout */}
        <button className={styles.logoutBtn} onClick={closeMobile}>
          <LogOut size={20} />
          <span className={`${styles.navText} ${isCollapsed ? styles.hideOnCollapse : ''}`}>Logout</span>
        </button>
      </div>

    </aside>
  );
}
