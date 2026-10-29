import React from 'react';
import { User } from 'lucide-react';
import styles from './ProfileHeader.module.css';

export default function ProfileHeader() {
  return (
    <div className={styles.headerRow}>
      <div className={styles.titleArea}>
        <div className={styles.iconBox}>
          <User size={24} className={styles.mainIcon} />
        </div>
        <div>
          <h1 className={styles.title}>Profile</h1>
          <p className={styles.subtitle}>
            Tell us about your business so we can create more relevant and effective AI content, campaigns and growth recommendations tailored to your needs.
          </p>
        </div>
      </div>
    </div>
  );
}
