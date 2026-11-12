'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import styles from './Header.module.css';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useProfile } from '@/context/ProfileContext';
import { getUploadsBaseUrl } from '@/lib/imageUrl';
import { User } from 'lucide-react';
import Link from "next/link";

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  //  Ek hi baar useProfile call karein
  const { user, loading, setUser } = useProfile();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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

  // Logout Handler
  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.log("Logout API error", error);
    } finally {
      // Local cleanup (Chahe API fail ho ya pass)
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      setUser(null); // Context clear karein

      toast.success('Logged out successfully');
      router.push('/login');
      setLoggingOut(false);
      setIsDropdownOpen(false);
    }
  };

  // Image Logic
  const hasImage = user?.image;
  const avatarSrc = hasImage ? `${getUploadsBaseUrl()}/users/${user.image}` : null;
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : '';

  const AvatarSkeleton = () => (
    <div className={styles.avatarSkeleton} />
  );

  return (
    <header className={styles.header}>
      <div className={styles.leftArea}>
        <button className={styles.menuBtn} onClick={onMenuClick} aria-label="Open menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
        <div className={styles.pageTitle}>Dashboard</div>
      </div>

      <div className={styles.rightArea}>
        <ThemeToggle />

        <Link href="/dashboard/help" className={styles.iconBtn} aria-label="Help">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </Link>

        <div className={styles.userProfileWrapper} ref={dropdownRef}>
          <button
            className={styles.avatarBtn}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {loading ? (
              <AvatarSkeleton />
            ) : avatarSrc ? (
              <img src={avatarSrc} alt={user?.name || "User"} className={styles.avatarImg} />
            ) : (
              <div className={styles.avatarFallback}>
                {userInitial || <User size={18} />}
              </div>
            )}
          </button>

          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              <div className={styles.dropdownHeader}>
                {loading ? (
                  <div className={styles.avatarSkeleton} style={{ width: 44, height: 44 }} />
                ) : avatarSrc ? (
                  <img src={avatarSrc} alt={user?.name || "User"} className={styles.dropdownAvatar} />
                ) : (
                  <div className={styles.dropdownAvatarFallback}>
                    {userInitial || <User size={20} />}
                  </div>
                )}

                <div className={styles.dropdownUserInfo}>
                  {loading ? (
                    <>
                      <div className={styles.textSkeleton} style={{ width: '80px' }} />
                      <div className={styles.textSkeleton} style={{ width: '120px', marginTop: '4px' }} />
                    </>
                  ) : (
                    <>
                      <span className={styles.dropdownName}>{user?.name || "User"}</span>
                      <span className={styles.dropdownEmail}>{user?.email || "No email"}</span>
                    </>
                  )}
                </div>
              </div>

              <div className={styles.dropdownDivider}></div>

              <div className={styles.dropdownList}>
                <Link href="/dashboard/help" className={styles.dropdownItem}>
                  <span className={styles.dropdownIconWrapper}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
                  </span>
                  <span className={styles.dropdownText}>Support</span>
                </Link>

                <button
                  className={styles.dropdownItem}
                  onClick={() => {
                    setIsDropdownOpen(false);
                    router.push('/dashboard/profile');
                  }}
                >
                  <span className={styles.dropdownIconWrapper}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  </span>
                  <span className={styles.dropdownText}>Profile settings</span>
                </button>

                <div className={styles.dropdownDivider}></div>

                <button
                  className={styles.dropdownItem}
                  onClick={handleLogout}
                  disabled={loggingOut}
                  style={{ color: '#ef4444' }}
                >
                  <span className={styles.dropdownIconWrapper}>
                    {loggingOut ? (
                      <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                    )}
                  </span>
                  <span className={styles.dropdownText}>{loggingOut ? 'Logging out...' : 'Logout'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}