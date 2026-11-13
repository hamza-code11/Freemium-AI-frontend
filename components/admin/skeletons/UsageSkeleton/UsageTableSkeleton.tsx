import React from 'react';
import styles from './UsageSkeleton.module.css';

export default function UsageTableSkeleton() {
  return (
    <div className={styles.tableRows}>
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className={styles.row}>
          <div className={styles.cellUser}>
            <div className={styles.avatar} />
            <div className={styles.lines}>
              <div className={styles.line} />
              <div className={styles.lineSm} />
            </div>
          </div>
          <div className={styles.line} style={{ width: 70 }} />
          <div className={styles.line} style={{ width: 70 }} />
          <div className={styles.line} style={{ width: 130 }} />
          <div className={styles.line} style={{ width: 60 }} />
        </div>
      ))}
    </div>
  );
}
