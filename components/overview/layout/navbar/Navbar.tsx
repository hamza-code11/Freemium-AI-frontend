'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from "next/link";
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useProfile } from '@/context/ProfileContext';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // 🔥 Context se user nikaalein
  const { user } = useProfile(); 

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>

        {/* LEFT: LOGO IMAGE */}
        <a href="/" className={styles.logo} onClick={closeMenu}>
          <Image
            src="/logo/logo.png"
            alt="Freemium AI Logo"
            width={180}
            height={50}
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
            {/* 🔥 CONDITION: Agar user login hai to Dashboard dikhao, warna Login/Register */}
            {user ? (
              <Link href="/dashboard" className={styles.btnSignup}>
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/login" className={styles.btnLogin}>
                  Log in
                </Link>
                <Link href="/register" className={styles.btnSignup}>
                  Get Started
                </Link>
              </>
            )}
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
          {/* 🔥 CONDITION: Mobile me bhi Dashboard show hoga agar user login hai */}
          {user ? (
            <Link href="/dashboard" className={styles.btnSignupMobile} onClick={closeMenu}>
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" className={styles.btnLoginMobile} onClick={closeMenu}>
                Log in
              </Link>
              <Link href="/register" className={styles.btnSignupMobile} onClick={closeMenu}>
                Get Started
              </Link>
            </>
          )}
        </div>
      </aside>
    </nav>
  );
}