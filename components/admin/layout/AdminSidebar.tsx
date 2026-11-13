'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Users, CreditCard, Settings, FileText, LogOut, Mail, Headphones,
} from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { useUnreadContactCount } from '@/hooks/useUnreadContactCount';
import styles from './AdminSidebar.module.css';

const BOTTOM_ITEMS = [
  { label: 'Settings', href: '/admin/profile', icon: <Settings size={20} /> },
];

interface SidebarProps {
  isMobileOpen: boolean;
  closeMobile: () => void;
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

export default function AdminSidebar({
  isMobileOpen,
  closeMobile,
  isCollapsed,
  toggleCollapse,
}: SidebarProps) {
  const pathname = usePathname();
  const { logout } = useAdmin();
  const { count } = useUnreadContactCount();

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: <LayoutDashboard size={20} /> },
    { label: 'Users', href: '/admin/users', icon: <Users size={20} /> },
    { label: 'Leads History', href: '/admin/usage', icon: <FileText size={20} /> },
    {
      label: 'Contact Messages',
      href: '/admin/contact',
      icon: <Mail size={20} />,
      badge: count > 0 ? count : undefined,
    },
    { label: 'Support Tickets', href: '/admin/support', icon: <Headphones size={20} /> },
  ];

  const handleLogout = async () => {
    closeMobile();
    await logout();
  };

  return (
    <aside
      className={`${styles.sidebar} ${isMobileOpen ? styles.mobileOpen : ''} ${isCollapsed ? styles.collapsed : ''
        }`}
    >
      {/* Header */}
      <div className={styles.sidebarHeader}>
        <Link
          href="/"
          className={`${styles.logoArea} ${isCollapsed ? styles.hideOnCollapse : ''}`}
          onClick={closeMobile}
        >
          <Image
            src="/logo/logo.png"
            alt="Freemium AI"
            width={140}
            height={40}
            className={styles.logoImg}
          />
          <span className={styles.logoText}>Admin</span>
        </Link>

        <button className={styles.collapseBtn} onClick={toggleCollapse} aria-label="Toggle Sidebar">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="4" ry="4" />
            <line x1="9" y1="3" x2="9" y2="21" />
          </svg>
        </button>
      </div>

      {/* Nav */}
      <nav className={styles.nav}>
        <span className={`${styles.navLabel} ${isCollapsed ? styles.hideOnCollapse : ''}`}>
          ADMIN MENU
        </span>

        {navItems.map((item) => {
          // 🔥 FIX: Dashboard tabhi active hoga jab exact '/admin' ho. 
          // Baaki pages ke liye startsWith use hoga.
          const isActive = item.href === '/admin'
            ? pathname === '/admin'
            : pathname === item.href || pathname?.startsWith(item.href + '/');

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
              onClick={closeMobile}
              title={isCollapsed ? item.label : undefined}
            >
              <span className={styles.iconWrapper}>{item.icon}</span>
              <span className={`${styles.navText} ${isCollapsed ? styles.hideOnCollapse : ''}`}>
                {item.label}
              </span>
              {item.badge !== undefined && (
                <span
                  className={`${styles.navBadge} ${isCollapsed ? styles.badgeCollapsed : ''
                    }`}
                >
                  {item.badge > 99 ? '99+' : item.badge}
                </span>
              )}
            </Link>
          );
        })}
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
            <span className={`${styles.navText} ${isCollapsed ? styles.hideOnCollapse : ''}`}>
              {item.label}
            </span>
          </Link>
        ))}

        <button className={styles.logoutBtn} onClick={handleLogout}>
          <LogOut size={20} />
          <span className={`${styles.navText} ${isCollapsed ? styles.hideOnCollapse : ''}`}>
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
}