'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './Header.module.css';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={styles.header}>
      
      {/* Left: Mobile Menu & Page Title */}
      <div className={styles.leftArea}>
        <button className={styles.menuBtn} onClick={onMenuClick} aria-label="Open menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
        
        <div className={styles.pageTitle}>
          Dashboard
        </div>
      </div>

      {/* Right: Actions */}
      <div className={styles.rightArea}>
        
        <ThemeToggle />

        {/* Help Icon */}
        <button className={styles.iconBtn} aria-label="Help">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
        </button>

        {/* Profile Dropdown */}
        <div className={styles.userProfileWrapper} ref={dropdownRef}>
          <button 
            className={styles.avatarBtn} 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <img 
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop" 
              alt="Hamza" 
              className={styles.avatarImg} 
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              
              {/* User Info */}
              <div className={styles.dropdownHeader}>
                <img 
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop" 
                  alt="Hamza" 
                  className={styles.dropdownAvatar} 
                />
                <div className={styles.dropdownUserInfo}>
                  <span className={styles.dropdownName}>Hamza</span>
                  <span className={styles.dropdownEmail}>hamza98.dev@gmail.com</span>
                </div>
              </div>

              <div className={styles.dropdownDivider}></div>

              {/* Menu Items */}
              <div className={styles.dropdownList}>
                
                <button className={styles.dropdownItem}>
                  <span className={styles.dropdownIconWrapper}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
                  </span>
                  <span className={styles.dropdownText}>Support</span>
                </button>

                <button className={styles.dropdownItem}>
                  <span className={styles.dropdownIconWrapper}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  </span>
                  <span className={styles.dropdownText}>Profile settings</span>
                </button>

                <div className={styles.dropdownDivider}></div>

                <button className={styles.dropdownItem}>
                  <span className={styles.dropdownIconWrapper}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                  </span>
                  <span className={styles.dropdownText}>Logout</span>
                </button>
              </div>

            </div>
          )}
        </div>

      </div>

    </header>
  );
}
