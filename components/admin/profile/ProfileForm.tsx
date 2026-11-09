'use client';

import React, { useState, useEffect } from 'react';
import { Camera, User, Mail, Lock, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import styles from './ProfileForm.module.css';
import { useAdmin } from '@/context/AdminContext';
import { getUploadsBaseUrl } from '@/lib/imageUrl'; // 🔥 Updated Import
import axiosInstance from '@/lib/axios';

export default function ProfileForm() {
  const { admin, updateAdmin } = useAdmin();
  
  // --- Profile States ---
  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState('');

  // --- Password States ---
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  // Load Admin Data
  useEffect(() => {
    if (admin) {
      setName(admin.name);
      // 🔥 Admin Image Path Logic
      if (admin.image) {
        setAvatarPreview(`${getUploadsBaseUrl()}/admins/${admin.image}`);
      } else {
        setAvatarPreview('');
      }
    }
  }, [admin]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  // 🔥 Save Profile (Name + Image)
  const handleSaveProfile = async () => {
    if (!name.trim()) return toast.error('Name cannot be empty');
    
    setSavingProfile(true);
    const success = await updateAdmin({ name: name.trim(), image: imageFile || undefined });
    if (success) {
      setImageFile(null); 
    }
    setSavingProfile(false);
  };

  // 🔥 Change Password
  const handleUpdatePassword = async () => {
    if (!currentPassword) return toast.error('Enter current password');
    if (newPassword.length < 8) return toast.error('New password must be at least 8 characters');
    if (newPassword !== confirmPassword) return toast.error('Passwords do not match');
    if (currentPassword === newPassword) return toast.error('New password must be different from current');

    setSavingPassword(true);
    try {
      await axiosInstance.post('/admin/change-password', {
        current_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });
      
      toast.success('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      const msg = error.response?.data?.detail;
      toast.error(typeof msg === 'string' ? msg : 'Failed to update password');
    } finally {
      setSavingPassword(false);
    }
  };

  if (!admin) return null;

  return (
    <div className={styles.container}>
      
      {/* Card 1: Profile Photo */}
      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h2 className={styles.cardTitle}>Profile Photo</h2>
            <p className={styles.cardDesc}>This will be displayed on your profile and public comments.</p>
          </div>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.avatarSection}>
            <div className={styles.avatarWrapper}>
              {avatarPreview ? (
                <img src={avatarPreview} alt="Profile" className={styles.avatarImg} />
              ) : (
                <div className={styles.avatarImg} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg-tertiary)' }}>
                  <User size={32} style={{ color: 'var(--color-text-tertiary)' }} />
                </div>
              )}
              <label htmlFor="avatar-upload" className={styles.uploadIcon}>
                <Camera size={16} />
              </label>
              <input id="avatar-upload" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
            </div>
            <div className={styles.avatarActions}>
              <label htmlFor="avatar-upload" className={styles.secondaryBtn} style={{ cursor: 'pointer' }}>
                Upload New
              </label>
              <p className={styles.hint}>JPG, PNG or WEBP. Max size 2MB.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Card 2: Account Information */}
      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h2 className={styles.cardTitle}>Account Information</h2>
            <p className={styles.cardDesc}>Update your basic account details.</p>
          </div>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.form}>
            <div className={styles.row}>
              <div className={styles.group}>
                <label>Full Name</label>
                <div className={styles.inputWrapper}>
                  <User size={16} className={styles.inputIcon} />
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                  />
                </div>
              </div>
              <div className={styles.group}>
                <label>Email Address</label>
                <div className={styles.inputWrapper}>
                  <Mail size={16} className={styles.inputIcon} />
                  <input 
                    type="email" 
                    value={admin.email} 
                    disabled 
                    style={{ opacity: 0.6, cursor: 'not-allowed' }} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.cardFooter}>
          <button type="button" className={styles.primaryBtn} onClick={handleSaveProfile} disabled={savingProfile}>
            <Save size={16} /> {savingProfile ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </section>

      {/* Card 3: Security */}
      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h2 className={styles.cardTitle}>Security & Password</h2>
            <p className={styles.cardDesc}>Ensure your account is using a long, random password to stay secure.</p>
          </div>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.form}>
            <div className={styles.group}>
              <label>Current Password</label>
              <div className={styles.inputWrapper}>
                <Lock size={16} className={styles.inputIcon} />
                <input 
                  type="password" 
                  placeholder="Enter current password" 
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.group}>
                <label>New Password</label>
                <div className={styles.inputWrapper}>
                  <Lock size={16} className={styles.inputIcon} />
                  <input 
                    type="password" 
                    placeholder="Create new password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.group}>
                <label>Confirm New Password</label>
                <div className={styles.inputWrapper}>
                  <Lock size={16} className={styles.inputIcon} />
                  <input 
                    type="password" 
                    placeholder="Confirm new password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.cardFooter}>
          <button type="button" className={styles.primaryBtn} onClick={handleUpdatePassword} disabled={savingPassword}>
            {savingPassword ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      </section>

    </div>
  );
}