'use client';

import React, { useState } from 'react';
import Image from 'next/image'; 
import ThemeToggle from '@/components/ui/ThemeToggle'; 
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        
        {/* LEFT: LOGO IMAGE (No Box) */}
        <a href="/" className={styles.logo} onClick={closeMenu}>
          <Image 
            src="/logo/logo.png" 
            alt="Freemium AI Logo" 
            width={180}  // Size barha diya
            height={50}  // Size barha diya
            className={styles.logoImg}
            priority
          />
        </a>

        {/* CENTER: DESKTOP NAVIGATION LINKS */}
        <div className={styles.desktopNavCenter}>
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          ))}
        </div>

        {/* RIGHT: ACTIONS & THEME TOGGLE */}
        <div className={styles.desktopNavRight}>
          <ThemeToggle />
          <div className={styles.navActions}>
            <button className={styles.btnLogin}>Log in</button>
            <button className={styles.btnSignup}>Get Started</button>
          </div>
        </div>

        {/* MOBILE TOGGLE (Right Side) */}
        <div className={styles.mobileRightActions}>
          <ThemeToggle />
          <button 
            className={styles.mobileToggle} 
            onClick={toggleMenu} 
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* OVERLAY */}
      <div 
        className={`${styles.overlay} ${isMenuOpen ? styles.overlayActive : ''}`} 
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* MOBILE SIDEBAR */}
      <aside className={`${styles.sidebar} ${isMenuOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          {/* Mobile menu mein bhi bada logo */}
          <Image 
            src="/logo/logo.png" 
            alt="Freemium AI Logo" 
            width={140} 
            height={40} 
            className={styles.logoImg}
          />
          <button className={styles.closeBtn} onClick={closeMenu} aria-label="Close menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className={styles.sidebarLinks}>
          {NAV_LINKS.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              className={styles.sidebarLink}
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className={styles.sidebarActions}>
          <button className={styles.btnLoginMobile} onClick={closeMenu}>Log in</button>
          <button className={styles.btnSignupMobile} onClick={closeMenu}>Get Started</button>
        </div>
      </aside>
    </nav>
  );
}
