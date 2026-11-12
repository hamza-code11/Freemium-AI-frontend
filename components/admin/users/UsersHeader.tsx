import React from 'react';
import { Download } from 'lucide-react';
import styles from './UsersHeader.module.css';

export default function UsersHeader() {
  return (
    <div className={styles.headerRow}>
      <div>
        <div className={styles.breadcrumb}>Admin / Users</div>
        <h1 className={styles.title}>User Management</h1>
        <p className={styles.subtitle}>View and manage registered accounts across your platform.</p>
      </div>
      {/* <button className={styles.exportBtn}>
        <Download size={16} /> Export Users
      </button> */}
    </div>
  );
}
