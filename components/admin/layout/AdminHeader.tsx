'use client';

import React from 'react';
import { Menu, Bell, LogOut, User as UserIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useAdmin } from '@/context/AdminContext';
import { getUploadsBaseUrl } from '@/lib/imageUrl';
import toast from 'react-hot-toast';
import styles from './AdminHeader.module.css';

export default function AdminHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const { admin, logout } = useAdmin();
  const router = useRouter();

  // Fallback avatar agar image na ho
  const avatarSrc = admin?.image 
    ? `${getUploadsBaseUrl()}/admins/${admin.image}` 
    : null;

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    router.push('/admin/login');
  };

  return (
    <header className={styles.header}>
      
      {/* LEFT: Menu Button */}
      <div className={styles.leftArea}>
        <button className={styles.menuBtn} onClick={onMenuClick} aria-label="Open menu">
          <Menu size={24} />
        </button>
      </div>

      {/* RIGHT: Actions + Profile */}
      <div className={styles.rightArea}>
        <ThemeToggle />
        
        {/* <button className={styles.iconBtn} aria-label="Notifications">
          <Bell size={20} />
          <span className={styles.notificationDot}></span>
        </button> */}
        
        {/* Profile Section (Dynamic) */}
        <div className={styles.userProfile}>
          {avatarSrc ? (
            <img 
              src={avatarSrc} 
              alt={admin?.name || 'Admin'} 
              className={styles.avatar}
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <div className={styles.avatar}>
              {admin?.name ? admin.name.charAt(0).toUpperCase() : 'A'}
            </div>
          )}
          
          <div className={styles.userInfo}>
            <span className={styles.userName}>
              {admin?.name || 'Admin User'}
            </span>
            <span className={styles.userRole}>Admin</span>
          </div>
        </div>
      </div>

    </header>
  );
}