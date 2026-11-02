'use client';

import React, { useState } from 'react';
import { Camera, User, Mail, Lock, Save } from 'lucide-react';
import styles from './ProfileForm.module.css';

export default function ProfileForm() {
  const [avatarPreview, setAvatarPreview] = useState(
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80'
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

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
              <img src={avatarPreview} alt="Profile" className={styles.avatarImg} />
              <label htmlFor="avatar-upload" className={styles.uploadIcon}>
                <Camera size={16} />
              </label>
              <input id="avatar-upload" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
            </div>
            <div className={styles.avatarActions}>
              <button type="button" className={styles.secondaryBtn}>Upload New</button>
              <button type="button" className={styles.textBtn}>Remove</button>
              <p className={styles.hint}>JPG, PNG or GIF. Max size 2MB.</p>
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
          <form className={styles.form}>
            <div className={styles.row}>
              <div className={styles.group}>
                <label>Full Name</label>
                <div className={styles.inputWrapper}>
                  <User size={16} className={styles.inputIcon} />
                  <input type="text" defaultValue="Admin Khan" />
                </div>
              </div>
              <div className={styles.group}>
                <label>Email Address</label>
                <div className={styles.inputWrapper}>
                  <Mail size={16} className={styles.inputIcon} />
                  <input type="email" defaultValue="admin@freemiumai.com" />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className={styles.cardFooter}>
          <button type="button" className={styles.primaryBtn}>
            <Save size={16} /> Save Changes
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
          <form className={styles.form}>
            <div className={styles.group}>
              <label>Current Password</label>
              <div className={styles.inputWrapper}>
                <Lock size={16} className={styles.inputIcon} />
                <input type="password" placeholder="Enter current password" />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.group}>
                <label>New Password</label>
                <div className={styles.inputWrapper}>
                  <Lock size={16} className={styles.inputIcon} />
                  <input type="password" placeholder="Create new password" />
                </div>
              </div>
              <div className={styles.group}>
                <label>Confirm New Password</label>
                <div className={styles.inputWrapper}>
                  <Lock size={16} className={styles.inputIcon} />
                  <input type="password" placeholder="Confirm new password" />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className={styles.cardFooter}>
          <button type="button" className={styles.primaryBtn}>
            Update Password
          </button>
        </div>
      </section>

    </div>
  );
}
